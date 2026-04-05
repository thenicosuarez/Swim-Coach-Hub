import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    calendlyUrl: process.env.COACH_CALENDLY_URL || "https://calendly.com/[your-handle]",
  });
}
