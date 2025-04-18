import { ORG } from "../app/generated/prisma";

export type AppUser = {
  id: string;
  name: string;
  organization: ORG;
  avatarUrl: string;
  password: string;
};
