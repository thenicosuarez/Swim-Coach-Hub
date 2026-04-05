import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function requireAuth(): Promise<null | NextResponse> {
  const cookieStore = await cookies();
  const session = cookieStore.get("coach-session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
