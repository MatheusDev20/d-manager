import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./app/api/auth/auth";

// import { auth } from "@/src/app/api/auth/auth";

const privateRoutes = ["/", "/team"];

export async function middleware(request: NextRequest) {
  // console.log("Run!");
  // const session = await auth();
  const session = null;
  console.log("Session", session);
  // const session = false;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = privateRoutes.some((route) => route === pathname);
  if (!session && isProtectedRoute) {
    console.log("Is protected route and no session", isProtectedRoute);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
