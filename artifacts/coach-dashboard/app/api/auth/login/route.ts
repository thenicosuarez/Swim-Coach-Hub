import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.COACH_PASSWORD;

    if (!expected || password !== expected) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = createSessionToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set("coach-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
