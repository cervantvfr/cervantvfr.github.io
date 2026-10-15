import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve('src/assets/blog');
const files = (await readdir(dir)).filter(name => name.endsWith('.md'));
const posts = [];

for (const file of files) {
  const slug = file.slice(0, -3);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${file} must use a lowercase slug with hyphens`);
  }

  const raw = await readFile(path.join(dir, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`${file} needs front matter between --- lines`);
  }

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) {
      continue;
    }
    const separator = line.indexOf(':');
    if (separator === -1) {
      throw new Error(`${file} has a front matter line without a colon`);
    }
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }

  if (!meta.title) {
    throw new Error(`${file} needs a title`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date ?? '')) {
    throw new Error(`${file} date must be YYYY-MM-DD`);
  }

  const words = match[2].trim().split(/\s+/).filter(Boolean).length;
  posts.push({
    slug,
    title: meta.title,
    subtitle: meta.subtitle ?? '',
    date: meta.date,
    minutes: Math.max(1, Math.round(words / 200))
  });
}

posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
await writeFile(path.join(dir, 'index.json'), `${JSON.stringify(posts, null, 2)}\n`);
