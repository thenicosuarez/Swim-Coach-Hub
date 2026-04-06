import { NextResponse } from "next/server";
import { db, yogaInquiriesTable } from "@workspace/db";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const inquiries = await db
      .select()
      .from(yogaInquiriesTable)
      .orderBy(desc(yogaInquiriesTable.createdAt));
    return NextResponse.json(inquiries);
  } catch (err) {
    console.error("[yoga leads]", err);
    return NextResponse.json({ error: "Failed to load yoga leads" }, { status: 500 });
  }
}
