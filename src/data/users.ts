/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { encryptPassword } from "../lib/bcrypt";
import prisma from "../lib/prisma";
import { AppUser } from "../lib/types";

/**
 * Finds a user by their email address.
 * @param email The email of the user to find.
 * @returns A promise that resolves to the user record or null if not found.
 */
export async function findByMail(email: string): Promise<AppUser | null> {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      include: { organization: true },
    });

    if (!user) return null;
    // Assuming AppUser contains at least id and organization
    return {
      id: user.id,
      name: user.name,
      organization: user.organization,
      password: user.password,
      avatarUrl: user.picture ?? "",
    } as AppUser;
  } catch (err: any) {
    console.error(err);
    throw new Error("DB Find user error");
  }
}

/**
 * Creates a new user with encrypted password and connects the user to an organization.
 * @param data The user data including organizationId and password.
 */
export async function createUser(data: any): Promise<void> {
  const { organizationId, password, ...userData } = data;

  // Check the organization exists first
  const org = await prisma.oRG.findUnique({
    where: { id: organizationId },
  });
  if (!org) throw new Error("Organization not found");

  // Encrypt the password before saving to DB
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
    console.error(err);
    throw new Error("DB Create user error");
  }
}
