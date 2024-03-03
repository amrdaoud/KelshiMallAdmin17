import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListViewModel } from '../user-manager';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembershipService } from '../../memberships/membership.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { SelectComponent } from "../../app-reusables/controls/select/select.component";
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { filter, switchMap } from 'rxjs';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-membership-add',
    standalone: true,
    templateUrl: './membership-add.component.html',
    styleUrls: ['./membership-add.component.scss'],
    imports: [CommonModule, MatCardModule,
      MatButtonModule, ReactiveFormsModule, MatGridListModule, SelectComponent, MatProgressSpinnerModule]
})
export class MembershipAddComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public userId: string) {
    this.frm = new FormGroup({
      userId: new FormControl(userId),
      membershipId: new FormControl('', Validators.required),
      months: new FormControl('', Validators.required)
    });
  }
  private membershipService = inject(MembershipService);
  private confirm = inject(ConfirmService);
  private dialogRef = inject(MatDialogRef<MembershipAddComponent>)
  memberships$ = this.membershipService.getMemberships();
  frm: FormGroup;
  loadingMemberships$ = this.membershipService.loading$;
  loadingAdd$ = this.membershipService.loadingAddToUser$;
  months = [
    {Name: '1 Month', Value: 1},
    {Name: '3 Months', Value: 3},
    {Name: '6 Months', Value: 6},
    {Name: '12 Months', Value: 12}
  ];
  submit() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Title: 'Subscribe', Message:`Are you sure you want to change this user's membership?`}).pipe(
      filter(result => result),
      switchMap(() => this.membershipService.addMembershipToUser(this.frm.value.userId, this.frm.value.membershipId, this.frm.value.months))
    ).subscribe(x => {
      if(x) {
        this.dialogRef.close(x);
      }
    });
  }
}
