import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionData {
  username: string;
  isLoggedIn: boolean;
}

const protectedRoutes = ["/", "/team", "/daily", "/settings"];
const publicRoutes = ["/login", "/register", "/forgot-password"];

const sessionOptions = {
  cookieName: "d-manager-session",
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    try {
      const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions,
      );

      if (!session.isLoggedIn) {
        // const fromAPI = pathname.startsWith("/api");
        // if (fromAPI) {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }
        const url = new URL("/login", request.url);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Session error:", error);
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
