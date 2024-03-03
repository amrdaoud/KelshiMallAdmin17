import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePayload } from 'firebase/messaging';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './post-notification.component.html',
  styleUrls: ['./post-notification.component.scss']
})
export class PostNotificationComponent {
  snackRef = inject(MatSnackBarRef<PostNotificationComponent>);
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: MessagePayload){
    
  }
  close(url?: string) {
    let q = this.route.url;
    if(url) {
      if(url.replace('/','').toLowerCase() === this.router.url.replace('/','').toLowerCase()) {
        location.reload();
      } else {
        this.router.navigateByUrl(url);
      }
    }
    this.snackRef.dismiss();
  }
}
