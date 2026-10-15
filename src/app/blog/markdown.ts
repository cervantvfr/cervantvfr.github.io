import { marked } from 'marked';

marked.use({ async: false });

export function renderMarkdown(raw: string): string {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const html = marked.parse(body);
  if (typeof html !== 'string') {
    throw new Error('Markdown renderer returned a promise');
  }
  return html;
}
