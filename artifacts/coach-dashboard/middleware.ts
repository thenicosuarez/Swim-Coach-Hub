import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

async function isValidToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.COACH_PASSWORD;
    if (!secret) return false;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode("coach-authenticated"));
    const expected = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    if (expected.length !== token.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
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
  if (!sessionCookie || !(await isValidToken(sessionCookie.value))) {
    if (pathname.includes("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginPath = basePath ? `${basePath}/login` : "/login";
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
