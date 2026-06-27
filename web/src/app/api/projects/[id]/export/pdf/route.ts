export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { chapters, projects } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import { createTypstCompiler, CompileFormatEnum } from "@myriaddreamin/typst.ts/compiler";
import { buildTypstDocument } from "@/lib/typst-templates";
import type { TypstCompiler } from "@myriaddreamin/typst.ts/compiler";

const TYPST_WASM_URL =
  "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.7.0/pkg/typst_ts_web_compiler_bg.wasm";

let _compilerPromise: Promise<TypstCompiler> | null = null;

async function getCompiler(): Promise<TypstCompiler> {
  if (_compilerPromise) return _compilerPromise;

  _compilerPromise = (async () => {
    const compiler = createTypstCompiler();
    await compiler.init({
      getModule: () => fetch(TYPST_WASM_URL),
    });
    return compiler;
  })();

  return _compilerPromise;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\-]/g, "_").slice(0, 100);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb(process.env as Record<string, unknown>);

  try {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const allChapters = await db
      .select()
      .from(chapters)
      .where(eq(chapters.projectId, id))
      .orderBy(asc(chapters.number))
      .all();

    if (allChapters.length === 0) {
      return NextResponse.json({ error: "No chapters" }, { status: 400 });
    }

    const typstSource = buildTypstDocument({
      title: project.title,
      author: project.author,
      chapters: allChapters.map((ch) => ({
        title: ch.title,
        content: ch.content || "",
      })),
      pageSize: project.settingsPageFormat || "6x9",
      fontFamily: project.settingsFontFamily || "Georgia",
      fontSize: project.settingsFontSize || 11,
      lineHeight: parseFloat(String(project.settingsLineHeight || "1.4")),
      marginTop: project.settingsMarginTop || "2cm",
      marginBottom: project.settingsMarginBottom || "2cm",
      marginInner: project.settingsMarginInner || "2.5cm",
      marginOuter: project.settingsMarginOuter || "2cm",
      language: project.language || "pt-BR",
      includeToc: true,
    });

    const compiler = await getCompiler();
    compiler.resetShadow();
    compiler.addSource("/main.typ", String(await typstSource));

    const result = await compiler.compile({
      mainFilePath: "/main.typ",
      format: CompileFormatEnum.pdf,
    });
    if (!result.result) {
      const diags = result.diagnostics;
      const diagMsg = Array.isArray(diags)
        ? diags.map((d: any) => d.message || d).join("; ")
        : "Unknown compilation error";
      return NextResponse.json({ error: `Typst compilation failed: ${diagMsg}` }, { status: 500 });
    }

    return new NextResponse(result.result as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${sanitizeFilename(project.title)}.pdf"`,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
