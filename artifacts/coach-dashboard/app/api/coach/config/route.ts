import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  return NextResponse.json({
    calendlyUrl: process.env.COACH_CALENDLY_URL || "",
  });
}
