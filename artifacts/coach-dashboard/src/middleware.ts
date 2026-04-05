import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublic =
    pathname === "/login" ||
    pathname === `${basePath}/login` ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith(`${basePath}/api/auth/`) ||
    pathname.startsWith("/plans/") ||
    pathname.startsWith(`${basePath}/plans/`) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon");

  if (isPublic) return NextResponse.next();

  const sessionCookie = request.cookies.get("coach-session");
  if (!sessionCookie) {
    const loginPath = basePath ? `${basePath}/login` : "/login";
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
