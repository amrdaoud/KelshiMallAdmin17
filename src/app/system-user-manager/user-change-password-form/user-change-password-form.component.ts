import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DeviceService } from '../../app-reusables/services/device.service';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { exhaustMap, filter, tap } from 'rxjs';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { SystemUserManagerService } from '../system-user-manager.service';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';

@Component({
  selector: 'app-user-change-password-form',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatGridListModule, ReactiveFormsModule, InputComponent, MatDividerModule, MatIconModule],
  templateUrl: './user-change-password-form.component.html',
  styleUrls: ['./user-change-password-form.component.scss']
})
export class UserChangePasswordFormComponent extends Unsubscriber {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {userId: string, rowIndex: number}) {
    super();
  }
  private mainService = inject(SystemUserManagerService);
  private deviceService = inject(DeviceService);
  isHandset$ = this.deviceService.isHandset$;
  private confirm = inject(ConfirmService);
  private dialogRef = inject(MatDialogRef<UserChangePasswordFormComponent>);
  frm = this.mainService.createChangePasswordForm(this.data.userId);
  loadingChangePassword$ = this.mainService.loadingChangePassword$;
  submit() {
    this._otherSubscription = this.confirm.open({Title: 'Change Password', Message: 'Are you sure you want to change user password?', MatColor: 'warn'}).pipe(
      filter(result => result),
      exhaustMap(() => this.mainService.changePassword(this.frm.value, this.data.rowIndex)),
      tap(x => {
        if(x) {
          this.dialogRef.close(true);
        }
      })
    ).subscribe();
  }
}
