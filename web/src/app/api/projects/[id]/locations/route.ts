import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { locations } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const rows = await db.select().from(locations).where(eq(locations.projectId, id)).all();
    return NextResponse.json(rows);
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
    const locId = generateId();
    await db.insert(locations).values({
      id: locId,
      projectId: id,
      name: body.name,
      description: body.description || null,
      type: body.type || "other",
      imageUrl: body.imageUrl || null,
      createdAt: now,
      updatedAt: now,
    });
    return NextResponse.json({ id: locId, projectId: id, name: body.name, type: body.type || "other", createdAt: now, updatedAt: now });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
