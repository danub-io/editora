export function buildTypstDocument(options: any) {
  return `
#set page(paper: "a4")
#set text(font: "Libertinus Serif")

#align(center)[
  #text(17pt)[*${options.title}*]
  #v(1em)
  #text(13pt)[${options.author}]
]

#v(2em)

${options.chapters?.map((c: any) => `#heading([${c.title}])\n\n${c.content}`).join("\n\n") || ""}
  `;
}
