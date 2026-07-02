export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { chapters } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils";

// GET /api/projects/[id]/chapters
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await (params as any);
  try {
    const db = getDb(process.env as Record<string, unknown>);
    const rows = await db
      .select()
      .from(chapters)
      .where(eq(chapters.projectId, id))
      .all();
    return NextResponse.json(
      rows.map((r: any) => ({
        ...r,
        tags: JSON.parse(r.tags || "[]"),
        type: r.type || "chapter",
      }))
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/projects/[id]/chapters
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await (params as any);
  try {
    const db = getDb(process.env as Record<string, unknown>);
    const body = (await req.json()) as any as Record<string, any>;
    const now = new Date().toISOString();
    const chapterId = generateId();

    await db.insert(chapters).values({
      id: chapterId,
      projectId: id,
      type: body.type || "chapter",
      parentId: body.parentId || null,
      order: body.order || 0,
      title: body.title,
      content: body.content || "",
      synopsis: body.synopsis || null,
      notes: body.notes || null,
      status: body.status || null,
      label: body.label || null,
      isFolder: body.isFolder || false,
      tags: JSON.stringify(body.tags || []),
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      id: chapterId,
      projectId: id,
      type: body.type || "chapter",
      parentId: body.parentId || null,
      order: body.order || 0,
      title: body.title,
      content: body.content || "",
      synopsis: body.synopsis || null,
      notes: body.notes || null,
      status: body.status || null,
      label: body.label || null,
      isFolder: body.isFolder || false,
      tags: body.tags || [],
      createdAt: now,
      updatedAt: now,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
