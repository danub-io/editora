export function buildTypstDocument(contentOrOptions: any, maybeOptions?: any) {
  const content = typeof contentOrOptions === 'string' ? contentOrOptions : '';
  const options = maybeOptions || (typeof contentOrOptions === 'object' ? contentOrOptions : {});

  return `
#set page(paper: "a4")
#set text(font: "Linux Libertine", size: 11pt)

${content}
${options.title ? `= ${options.title}` : ''}
${options.chapters ? options.chapters.map((ch: any) => `== ${ch.title}\n\n${ch.content}`).join('\n\n') : ''}
  `;
}
