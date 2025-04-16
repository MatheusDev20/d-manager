/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { encryptPassword } from "../bcrypt";
import prisma from "../prisma";
import { AppUser } from "../types";

export const findByMail = async (email: string): Promise<AppUser | null> => {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      include: { organization: true },
    });

    if (!user) return null;
    return { id: user.id, organization: user.organization } as AppUser;
  } catch (err: any) {
    console.error(err);
    throw new Error("DB Find user error", err);
  }
};

export const createUser = async (data: any) => {
  const { organizationId, password, ...userData } = data;
  const org = await prisma.oRG.findUnique({
    where: { id: organizationId },
  });

  if (!org) throw new Error("Organization not found");
  const hashed = await encryptPassword(password);

  try {
    await prisma.users.create({
      data: {
        ...userData,
        password: hashed,
        organization: { connect: { id: organizationId } },
      },
    });
  } catch (err: any) {
    console.log(err);
    throw new Error("DB Create user error", err);
  }
};
