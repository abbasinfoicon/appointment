import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies["access_token"] || null;
  const role = cookies["role"] || null;

  if (token) {
    if (path === "/login" || path === "/register" || path === "/reset-password" || path === "/forgot-password") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if (role === 'Admin' || role === 'Doctor') {
      if (path !== "/dashboard" && !path.startsWith("/dashboard/")) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
      }
    } else {
      if (path !== "/my-account" && !path.startsWith("/my-account/")) {
        return NextResponse.redirect(new URL("/my-account", req.nextUrl));
      }
    }
  } else {
    if (path.startsWith("/my-account") || path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-account",
    "/my-account/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
  ],
};
