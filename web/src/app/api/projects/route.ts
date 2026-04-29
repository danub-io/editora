import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { generateId } from "@/lib/utils";

// GET /api/projects — List all projects
export async function GET() {
  try {
    const rows = await db.select().from(projects).all();
    const result = rows.map((r) => ({
      ...r,
      categories: JSON.parse(r.categories || "[]"),
      keywords: JSON.parse(r.keywords || "[]"),
      settings: {
        pageFormat: r.settingsPageFormat,
        fontFamily: r.settingsFontFamily,
        fontSize: r.settingsFontSize,
        lineHeight: r.settingsLineHeight,
        margins: {
          top: r.settingsMarginTop,
          bottom: r.settingsMarginBottom,
          inner: r.settingsMarginInner,
          outer: r.settingsMarginOuter,
        },
        theme: r.settingsTheme,
      },
    }));
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/projects — Create project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const id = generateId();

    await db.insert(projects).values({
      id,
      title: body.title,
      author: body.author,
      description: body.description || null,
      language: body.language || "pt-BR",
      isbn: body.isbn || null,
      categories: JSON.stringify(body.categories || []),
      keywords: JSON.stringify(body.keywords || []),
      coverImage: body.coverImage || null,
      settingsPageFormat: body.settings?.pageFormat || "6x9",
      settingsFontFamily: body.settings?.fontFamily || "Lora",
      settingsFontSize: body.settings?.fontSize || 11,
      settingsLineHeight: body.settings?.lineHeight || 1.4,
      settingsMarginTop: body.settings?.margins?.top || "2cm",
      settingsMarginBottom: body.settings?.margins?.bottom || "2cm",
      settingsMarginInner: body.settings?.margins?.inner || "2.5cm",
      settingsMarginOuter: body.settings?.margins?.outer || "2cm",
      settingsTheme: body.settings?.theme || "light",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      id,
      title: body.title,
      author: body.author,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
