import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { tap } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { InputComponent } from '../../../controls/input/input.component';
import { Unsubscriber } from '../../../common/unsubscriber';
import { FcmNotificationService } from '../../../../app-services/fcm-notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule,
    MatCardModule,
    MatDividerModule,
    InputComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    RouterLink]
})

export class LoginComponent extends Unsubscriber {
  private account = inject(AccountService);
  private fcm = inject(FcmNotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  errorMessage = '';
  loadingLogin$ = this.account.loadingLogin$;
  frm = this.account.createLoginForm();
  returnUrl = this.route.snapshot.queryParams['returnUrl']
  login() {
    if (this.frm.invalid) {
      return;
    }
    this._otherSubscription = this.account.login(this.frm.value).pipe(
      tap(auth => {
        if (auth && auth.isAuthenticated) {
          this.returnUrl ? this.router.navigateByUrl(this.returnUrl) : this.router.navigateByUrl('')
        }
        else {
          this.errorMessage = auth.message
        }
      })
    )
      .subscribe( x =>
        this.fcm.requestPermission().then(
          (currentToken) => {
            if(currentToken) {
              console.log(currentToken);
              this.account.registerFcmToken(currentToken).subscribe()
            }
          }
        )
      );
  }
}
