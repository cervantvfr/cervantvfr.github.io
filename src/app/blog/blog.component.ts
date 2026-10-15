import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { BlogService } from './blog.service';
import { formatPostDate, PostMeta } from './post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  standalone: false
})
export class BlogComponent implements OnInit {
  posts: PostMeta[] = [];
  loaded = false;
  error = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(
    private blog: BlogService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Victor Cervantes - Blog');
    this.blog.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: posts => {
        this.posts = posts;
        this.loaded = true;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = true;
        this.cdr.markForCheck();
      }
    });
  }

  formatDate(iso: string): string {
    return formatPostDate(iso);
  }
}
