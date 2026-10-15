export interface PostMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  minutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

export function formatPostDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) {
    return iso;
  }
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
