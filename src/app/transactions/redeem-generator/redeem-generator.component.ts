import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { TransactionService } from '../transaction.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-redeem-generator',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule,InputComponent, ReactiveFormsModule, MatButtonModule],
  templateUrl: './redeem-generator.component.html',
  styleUrls: ['./redeem-generator.component.scss']
})
export class RedeemGeneratorComponent {
  private mainService = inject(TransactionService);
  private confirm = inject(ConfirmService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<RedeemGeneratorComponent>);
  frm = this.mainService.createRedeemForm();
  submit() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Title: 'Generating Redeems', Message: 'Are you sure you want to generate Redeem Codes?'}).pipe(
      filter(result => result),
      switchMap(() => this.mainService.generateRedeem(this.frm.value))
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Redeem with Code: ' + x.redeemCode +' has been generated', 'Dismiss', {duration: 2000});
        this.dialogRef.close(x);
      }
    })
  }
}
