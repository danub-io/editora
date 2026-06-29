export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { chapters, projects } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import { marked } from "marked";
import { getTheme } from "@/lib/export-templates";

// Minimal ZIP builder — no external dependencies.
// Produces a valid ZIP with STORE (no compression) for all entries.
// EPUB spec requires mimetype to be first and uncompressed.

const encoder = new TextEncoder();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

interface ZipEntry {
  name: string;
  data: Uint8Array;
}

function buildZip(entries: ZipEntry[]): Uint8Array {
  const localHeaders: Uint8Array[] = [];
  const centralDir: Uint8Array[] = [];
  const fileData: Uint8Array[] = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const crc = crc32(entry.data);
    const size = entry.data.length;

    // Local file header (30 bytes + filename)
    const lh = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(lh.buffer);
    lv.setUint32(0, 0x04034b50, true); // signature
    lv.setUint16(4, 20, true); // version needed (2.0)
    lv.setUint16(6, 0x0800, true); // flags (UTF-8)
    lv.setUint16(8, 0, true); // compression: STORE
    lv.setUint16(10, 0, true); // mod time
    lv.setUint16(12, 0, true); // mod date
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true); // compressed size
    lv.setUint32(22, size, true); // uncompressed size
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true); // extra field length
    lh.set(nameBytes, 30);
    localHeaders.push(lh);
    fileData.push(entry.data);

    // Central directory entry (46 bytes + filename)
    const cd = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(cd.buffer);
    cv.setUint32(0, 0x02014b50, true); // signature
    cv.setUint16(4, 20, true); // version made by
    cv.setUint16(6, 20, true); // version needed
    cv.setUint16(8, 0x0800, true); // flags (UTF-8)
    cv.setUint16(10, 0, true); // compression: STORE
    cv.setUint16(12, 0, true); // mod time
    cv.setUint16(14, 0, true); // mod date
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true); // compressed size
    cv.setUint32(24, size, true); // uncompressed size
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true); // extra field length
    cv.setUint16(32, 0, true); // comment length
    cv.setUint16(34, 0, true); // disk number start
    cv.setUint16(36, 0, true); // internal attrs
    cv.setUint32(38, 0, true); // external attrs
    cv.setUint32(42, offset, true); // relative offset of local header
    cd.set(nameBytes, 46);
    centralDir.push(cd);

    offset += 30 + nameBytes.length + size;
  }

  const cdOffset = offset;
  const cdSize = centralDir.reduce((s, c) => s + c.length, 0);

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true); // disk number
  ev.setUint16(6, 0, true); // disk with CD
  ev.setUint16(8, entries.length, true); // entries on disk
  ev.setUint16(10, entries.length, true); // total entries
  ev.setUint32(12, cdSize, true);
  ev.setUint32(16, cdOffset, true);
  ev.setUint16(20, 0, true); // comment length

  // Assemble
  const parts: Uint8Array[] = [
    ...localHeaders,
    ...fileData,
    ...centralDir,
    eocd,
  ];
  const totalLen = parts.reduce((s, p) => s + p.length, 0);
  const result = new Uint8Array(totalLen);
  let pos = 0;
  for (const part of parts) {
    result.set(part, pos);
    pos += part.length;
  }
  return result;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\-]/g, "_").slice(0, 100);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await (params as any);
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
      .orderBy(asc(chapters.order))
      .all();

    if (allChapters.length === 0) {
      return NextResponse.json({ error: "No chapters" }, { status: 400 });
    }

    const theme = getTheme(project.settingsTheme || "classic");

    // Build chapter XHTML files
    const chapterItems: string[] = [];
    const spineItems: string[] = [];
    const entries: ZipEntry[] = [];

    // mimetype must be first and uncompressed
    entries.push({
      name: "mimetype",
      data: encoder.encode("application/epub+zip"),
    });

    const parsedHtmlContents = await Promise.all(
      allChapters.map((ch: any) => marked.parse(ch.content || ""))
    );

    for (let i = 0; i < allChapters.length; i++) {
      const ch = allChapters[i];
      const filename = `chapter-${i + 1}.xhtml`;
      const idref = `chapter-${i + 1}`;
      chapterItems.push(
        `    <item id="${idref}" href="${filename}" media-type="application/xhtml+xml"/>`
      );
      spineItems.push(`    <itemref idref="${idref}"/>`);

      const htmlContent = parsedHtmlContents[i];
      const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${escapeXml(project.language || "pt-BR")}">
<head>
  <title>${escapeXml(ch.title)}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <h1>${escapeXml(ch.title)}</h1>
  ${htmlContent}
</body>
</html>`;

      entries.push({
        name: `OEBPS/${filename}`,
        data: encoder.encode(xhtml),
      });
    }

    // container.xml
    entries.push({
      name: "META-INF/container.xml",
      data: encoder.encode(
        `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
      ),
    });

    // content.opf
    const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="book-id" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="book-id">urn:uuid:${escapeXml(project.id)}</dc:identifier>
    <dc:title>${escapeXml(project.title)}</dc:title>
    <dc:creator>${escapeXml(project.author)}</dc:creator>
    <dc:language>${escapeXml(project.language || "pt-BR")}</dc:language>
    <meta property="dcterms:modified">${new Date().toISOString()}</meta>
  </metadata>
  <manifest>
    <item id="style" href="style.css" media-type="text/css"/>
${chapterItems.join("\n")}
    <item id="toc" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  </manifest>
  <spine toc="toc">
${spineItems.join("\n")}
  </spine>
</package>`;
    entries.push({ name: "OEBPS/content.opf", data: encoder.encode(opf) });

    // toc.ncx
    const navPoints = allChapters
      .map(
        (ch: any, i: number) =>
          `    <navPoint id="nav-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${escapeXml(ch.title)}</text></navLabel>
      <content src="chapter-${i + 1}.xhtml"/>
    </navPoint>`
      )
      .join("\n");

    const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${escapeXml(project.id)}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${escapeXml(project.title)}</text></docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`;
    entries.push({ name: "OEBPS/toc.ncx", data: encoder.encode(ncx) });

    // style.css
    entries.push({ name: "OEBPS/style.css", data: encoder.encode(theme.css) });

    const epubBuffer = buildZip(entries);

    return new NextResponse(epubBuffer as BodyInit, {
      headers: {
        "Content-Type": "application/epub+zip",
        "Content-Disposition": `attachment; filename="${sanitizeFilename(project.title)}.epub"`,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
