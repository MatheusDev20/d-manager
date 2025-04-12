import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/src/app/api/auth/auth";

const privateRoutes = ["/", "/team"];

export async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;
  const isProtectedRoute = privateRoutes.some((route) => route === pathname);
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
