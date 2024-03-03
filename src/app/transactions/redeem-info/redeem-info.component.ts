import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemCodeListViewModel } from '../transactions';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { QRCodeModule } from 'angularx-qrcode';
import { TransactionService } from '../transaction.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { ColumnDef } from '../../app-reusables/data-table/data-table.models';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-redeem-info',
  standalone: true,
  imports: [CommonModule, QRCodeModule, MatProgressBarModule, DataTableComponent, MatGridListModule, MatButtonModule],
  templateUrl: './redeem-info.component.html',
  styleUrls: ['./redeem-info.component.scss'],
  providers: [LocaleDatePipe]
})
export class RedeemInfoComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public redeem: RedeemCodeListViewModel) { }
  private mainService = inject(TransactionService);
  private confirm = inject(ConfirmService);
  private snackBar = inject(MatSnackBar);
  private bottomRef = inject(MatBottomSheetRef<RedeemInfoComponent>);
  redeemUsers = this.mainService.getRedeemUsers(this.redeem.redeemCode);
  loading$ = this.mainService.loadingRedeemUsers$;
  columns: ColumnDef[] = [
    {Name: "Used By", Property: "usedByStoreName", IsSort: true},
    {Name: "Mobile", Property: "usedByNumber", IsSort: true},
    {Name: "On", Property: "usedDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'}
  ]
  deactivateRedeem() {
    this.confirm.open({Title: 'Deactivating Redeem', Message: 'Are you sure you want to Deactivate Redeem Code?', MatColor:'warn'}).pipe(
      filter(result => result),
      switchMap(() => this.mainService.deactivateRedeem(this.redeem.redeemCode))
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Redeem with Code: ' + this.redeem.redeemCode +' has been deactivated', 'Dismiss', {duration: 2000});
        this.bottomRef.dismiss(x);
      }
    });
  }
}
