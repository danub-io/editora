import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { characters } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils";

// GET /api/projects/[id]/characters
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const rows = await db
      .select()
      .from(characters)
      .where(eq(characters.projectId, id))
      .all();
    return NextResponse.json(
      rows.map((r) => ({
        ...r,
        relationships: JSON.parse(r.relationships || "[]"),
      }))
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/projects/[id]/characters
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const charId = generateId();

    await db.insert(characters).values({
      id: charId,
      projectId: id,
      name: body.name,
      description: body.description || null,
      physicalTraits: body.physicalTraits || null,
      personality: body.personality || null,
      motivations: body.motivations || null,
      relationships: JSON.stringify(body.relationships || []),
      imageUrl: body.imageUrl || null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      id: charId,
      projectId: id,
      name: body.name,
      description: body.description,
      personality: body.personality,
      relationships: body.relationships || [],
      createdAt: now,
      updatedAt: now,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
