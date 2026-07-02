export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { chapters } from "@/lib/schema";
import { eq } from "drizzle-orm";

// PUT /api/chapters/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await (params as any);
  try {
    const db = getDb(process.env as Record<string, unknown>);
    const body = (await req.json()) as any as Record<string, any>;
    const now = new Date().toISOString();
    const updates: Record<string, any> = { updatedAt: now };

    if (body.title !== undefined) updates.title = body.title;
    if (body.content !== undefined) updates.content = body.content;
    if (body.parentId !== undefined) updates.parentId = body.parentId;
    if (body.synopsis !== undefined) updates.synopsis = body.synopsis;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.status !== undefined) updates.status = body.status;
    if (body.label !== undefined) updates.label = body.label;
    if (body.isFolder !== undefined) updates.isFolder = body.isFolder;
    if (body.order !== undefined) updates.order = body.order;
    if (body.tags !== undefined) updates.tags = JSON.stringify(body.tags);

    await db.update(chapters).set(updates).where(eq(chapters.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE /api/chapters/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await (params as any);
  try {
    const db = getDb(process.env as Record<string, unknown>);
    await db.delete(chapters).where(eq(chapters.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
