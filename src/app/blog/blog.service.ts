import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { renderMarkdown } from './markdown';
import { Post, PostMeta } from './post.model';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  list(): Observable<PostMeta[]> {
    return this.http.get<PostMeta[]>(this.asset('assets/blog/index.json'));
  }

  get(slug: string): Observable<Post | null> {
    if (!SLUG.test(slug)) {
      return of(null);
    }
    return this.list().pipe(
      switchMap(posts => {
        const meta = posts.find(post => post.slug === slug);
        if (!meta) {
          return of(null);
        }
        return this.http.get(this.asset(`assets/blog/${slug}.md`), { responseType: 'text' }).pipe(
          map(raw => ({ ...meta, html: renderMarkdown(raw) })),
          catchError(() => of(null))
        );
      })
    );
  }

  private asset(path: string): string {
    return new URL(path, document.baseURI).toString();
  }
}
