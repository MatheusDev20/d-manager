/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/auth";

const privateRoutes = ["/", "/team", "/daily"];

export default auth((req: any) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = privateRoutes.some(
    (route) => route === req.nextUrl.pathname,
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
