import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { SystemUserManagerService } from '../system-user-manager.service';
import { SystemUserListViewModel } from '../system-user-manager';

@Component({
  selector: 'app-user-roles-dialog',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule, FormsModule],
  templateUrl: './user-roles-dialog.component.html',
  styleUrls: ['./user-roles-dialog.component.scss']
})
export class UserRolesDialogComponent extends Unsubscriber {
  mainService = inject(SystemUserManagerService);
  dialogRef = inject(MatDialogRef<UserRolesDialogComponent>);
  loadingRoles$ = this.mainService.loadingRoles$;
  roles$ = this.mainService.getRoles();
  selectedRoles: string[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: SystemUserListViewModel, rowIndex: number}){
    super();
    this.selectedRoles = data.user.roles;
  }
  submit() {
    this._otherSubscription = this.mainService.editRoles({Id: this.data.user.systemUserId, Roles: this.selectedRoles}, this.data.rowIndex).subscribe(x => {
      if(x) {
        this.dialogRef.close(this.selectedRoles);
      }
    })
  }
}
