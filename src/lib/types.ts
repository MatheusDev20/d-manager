import { ORG } from "../app/generated/prisma";

export type AppUser = {
  id: string;
  organization: ORG;
};
