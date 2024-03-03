import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../post.service';
import { of, switchMap, tap } from 'rxjs';
import { Post } from '../post';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgImageSliderModule } from 'ng-image-slider';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-info',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, NgImageSliderModule,
    FormsModule, MatListModule,
    MatFormFieldModule, MatInputModule, LocaleDatePipe, MatCardModule
  ],
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  postAttachements: { image: string; thumbImage?: string; alt?: string; title: string; }[] = [];
  postId = 0;
  title = '';
  status = '';
  statusReason = '';
  loading$ = this.postService.loadingPost$;
  post$ = this.route.paramMap.pipe(
    switchMap((param: ParamMap) => {
      if(param.has('postId')) {
        return this.postService.getPostById(+param?.get('postId')!).pipe(
          tap((post: Post) => {
            this.postId = post.postId;
            this.title = post.title;
            this.status = post.status;
            this.statusReason = post.statusReason;
            this.postAttachements = post.postAttachment.map(x => {
              return {
                image: x.attachment.url,
                thumbImage: x.attachment.url,
                alt: '',
                title: x.attachment.isPrimary ? 'Primary' : ''
              }
            });
          })
        )
      }
      else {
        return of(undefined);
      }
    })
  );

      
}
