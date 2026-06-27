import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { timelineEvents } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const rows = await db.select().from(timelineEvents).where(eq(timelineEvents.projectId, id)).all();
    return NextResponse.json(rows.map((r) => ({ ...r, characterIds: JSON.parse(r.characterIds || "[]") })));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const eventId = generateId();
    await db.insert(timelineEvents).values({
      id: eventId,
      projectId: id,
      title: body.title,
      description: body.description || null,
      date: body.date || null,
      chapterId: body.chapterId || null,
      characterIds: JSON.stringify(body.characterIds || []),
      locationId: body.locationId || null,
      order: body.order || 0,
      createdAt: now,
      updatedAt: now,
    });
    return NextResponse.json({ id: eventId, projectId: id, title: body.title, createdAt: now, updatedAt: now });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
