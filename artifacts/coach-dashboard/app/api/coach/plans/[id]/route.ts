import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db, coachingPlansTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);
    const body = await request.json();

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (body.title !== undefined) updateData.title = body.title;
    if (body.goal !== undefined) updateData.goal = body.goal ?? null;
    if (body.drills !== undefined) updateData.drills = body.drills ?? null;
    if (body.notes !== undefined) updateData.notes = body.notes ?? null;
    if (body.clientId !== undefined) updateData.clientId = body.clientId ?? null;
    if (body.isPublic !== undefined) updateData.isPublic = body.isPublic;

    const [updated] = await db
      .update(coachingPlansTable)
      .set(updateData)
      .where(eq(coachingPlansTable.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated.id,
      clientId: updated.clientId ?? undefined,
      title: updated.title,
      goal: updated.goal ?? undefined,
      drills: updated.drills ?? undefined,
      notes: updated.notes ?? undefined,
      shareToken: updated.shareToken,
      isPublic: updated.isPublic,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }
}
