import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export async function requireAuth(): Promise<null | NextResponse> {
  const cookieStore = await cookies();
  const session = cookieStore.get("coach-session");
  if (!session || !verifySessionToken(session.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
