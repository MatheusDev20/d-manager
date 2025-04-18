import { ORG } from "@/src/app/generated/prisma";
import { SessionOptions } from "iron-session";

type SessionUser = {
  id: string;
  name: string;
  avatarUrl: string;
  organization: ORG | null;
};
export interface SessionData {
  user: SessionUser;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  user: { id: "", name: "", avatarUrl: "", organization: null },
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "d-manager-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
