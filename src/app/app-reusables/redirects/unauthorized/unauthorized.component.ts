import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  returnUrl = this.route.snapshot.queryParams['returnUrl']
  goToLogin() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
  backHome() {
    this.router.navigate(['/']);
  }
}
