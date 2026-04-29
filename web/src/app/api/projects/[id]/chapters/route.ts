import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chapters } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils";

// GET /api/projects/[id]/chapters
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const rows = await db
      .select()
      .from(chapters)
      .where(eq(chapters.projectId, id))
      .all();
    return NextResponse.json(
      rows.map((r) => ({
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
  const { id } = await params;
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const chapterId = generateId();

    await db.insert(chapters).values({
      id: chapterId,
      projectId: id,
      type: body.type || "chapter",
      subType: body.subType || null,
      partId: body.partId || null,
      number: body.number || 1,
      title: body.title,
      content: body.content || "",
      wordCount: body.wordCount || 0,
      tags: JSON.stringify(body.tags || []),
      status: body.status || "draft",
      notes: body.notes || null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      id: chapterId,
      projectId: id,
      type: body.type || "chapter",
      subType: body.subType || null,
      partId: body.partId || null,
      title: body.title,
      number: body.number || 1,
      status: body.status || "draft",
      content: body.content || "",
      wordCount: body.wordCount || 0,
      tags: body.tags || [],
      createdAt: now,
      updatedAt: now,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
