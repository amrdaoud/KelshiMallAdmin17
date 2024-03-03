import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { tap } from 'rxjs';
import { InputComponent } from '../../../controls/input/input.component';
import { Unsubscriber } from '../../../common/unsubscriber';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,
            MatCardModule,
            MatDividerModule,
            InputComponent,
            ReactiveFormsModule,
            MatButtonModule,
            MatProgressSpinnerModule,
            MatGridListModule,
            RouterLink],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends Unsubscriber {
  private account = inject(AccountService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  errorMessage = '';
  loadingLogin$ = this.account.loadingLogin$;
  frm = this.account.createChangePasswordForm();
  returnUrl = this.route.snapshot.queryParams['returnUrl']
  changePassword() {
    if(this.frm.invalid) {
      return;
    }
    this._otherSubscription = this.account.changePassword(this.frm.value).pipe(
      tap(auth => {
        if(auth && auth.isAuthenticated) {
          this.account.logOut();
          this.router.navigateByUrl('login');
        }
        else {
          this.errorMessage = auth.message
        }
      })
    )
    .subscribe();
  }
}
