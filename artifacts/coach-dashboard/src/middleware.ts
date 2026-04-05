import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const runtime = "nodejs";

const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

function isValidToken(token: string): boolean {
  try {
    const secret = process.env.COACH_PASSWORD;
    if (!secret) return false;
    const expected = createHmac("sha256", secret).update("coach-authenticated").digest("hex");
    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(token, "hex");
    if (expectedBuf.length !== actualBuf.length) return false;
    return timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}

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
  if (!sessionCookie || !isValidToken(sessionCookie.value)) {
    const loginPath = basePath ? `${basePath}/login` : "/login";
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
