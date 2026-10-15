import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BlogService } from './blog.service';
import { formatPostDate, Post } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  standalone: false
})
export class PostComponent implements OnInit {
  post: Post | null = null;
  missing = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(
    private route: ActivatedRoute,
    private blog: BlogService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.post = null;
        this.missing = false;
        return this.blog.get(params.get('slug') ?? '');
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(post => {
      if (!post) {
        this.missing = true;
        this.titleService.setTitle('Victor Cervantes - Blog');
        this.cdr.markForCheck();
        return;
      }
      this.post = post;
      this.titleService.setTitle(`${post.title} - Victor Cervantes`);
      this.cdr.markForCheck();
    });
  }

  formatDate(iso: string): string {
    return formatPostDate(iso);
  }
}
