import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db, coachingPlansTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const plans = await db
      .select()
      .from(coachingPlansTable)
      .orderBy(desc(coachingPlansTable.updatedAt));

    return NextResponse.json(
      plans.map(p => ({
        id: p.id,
        clientId: p.clientId ?? undefined,
        title: p.title,
        goal: p.goal ?? undefined,
        drills: p.drills ?? undefined,
        notes: p.notes ?? undefined,
        shareToken: p.shareToken,
        isPublic: p.isPublic,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { title, goal, drills, notes, clientId, isPublic } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const shareToken = randomUUID().replace(/-/g, "").slice(0, 24);

    const [plan] = await db
      .insert(coachingPlansTable)
      .values({
        title,
        goal: goal ?? null,
        drills: drills ?? null,
        notes: notes ?? null,
        clientId: clientId ?? null,
        isPublic: isPublic ?? true,
        shareToken,
      })
      .returning();

    return NextResponse.json({
      id: plan.id,
      clientId: plan.clientId ?? undefined,
      title: plan.title,
      goal: plan.goal ?? undefined,
      drills: plan.drills ?? undefined,
      notes: plan.notes ?? undefined,
      shareToken: plan.shareToken,
      isPublic: plan.isPublic,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
    }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create plan" }, { status: 500 });
  }
}
