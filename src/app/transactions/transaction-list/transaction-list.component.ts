import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TransactionService } from '../transaction.service';
//import { DeviceService } from '../../app-reusables/services/device.service';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { TransactionFilterModel, TransactionListViewModel } from '../transactions';
import { transactionConst } from '../transaction.const';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { filter, map, switchMap } from 'rxjs';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';

import { MatDialog } from '@angular/material/dialog';
import { StatusReasonDialogComponent } from '../status-reason-dialog/status-reason-dialog.component';
import { DeviceService } from '../../app-reusables/services/device.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  providers: [LocaleDatePipe, CurrencyPipe]
})
export class TransactionListComponent extends Unsubscriber {
  mainService = inject(TransactionService);
  confirm = inject(ConfirmService);
  dialog = inject(MatDialog);
  private deviceService = inject(DeviceService);
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  filters = transactionConst.filters;
  menuButtons = transactionConst.menuButtons;
  loadingTransactionRow$ = this.mainService.loadingTransactionRow$;
  selectButtons = transactionConst.selectBtns;
  
  data: any[] = [];
  dataSize!: number;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return transactionConst.columns.filter(x => !x.HideHandset)
        }
        return transactionConst.columns
    })
  );
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService.getTransactionsByFilter(filter as TransactionFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportTransactionsByFilter(filter as TransactionFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Transactions-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  tableMenuClicked(menuClickObject:{index: number, obj: TransactionListViewModel, objIndex: number}) {
    let curStatusReason='';
    if(menuClickObject.index == 0) {
      window.open(menuClickObject.obj.attachmentUrl, '_blank');
    }
    if(menuClickObject.index == 1) {
      this.confirm.open({Message: 'Are you sure you want to accept this payment?'})
      .pipe(
        filter(result => result),
        switchMap(() => this.mainService.acceptTransaction(menuClickObject.obj.transactionId, menuClickObject.objIndex))
      ).subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], status: 'Completed'}
          this.data = [...this.data]
        }
      })
    } else if(menuClickObject.index == 2) {
      this.confirm.open({Message: 'Are you sure you want to reject this payment?', MatColor:'warn'})
      .pipe(
        filter(result => result),
        switchMap(() => this.dialog.open(StatusReasonDialogComponent).afterClosed()),
        filter(statusReason => statusReason),
        switchMap(statusReason => {
          curStatusReason = statusReason;
          return this.mainService.rejectTransaction(menuClickObject.obj.transactionId, menuClickObject.objIndex, statusReason)
        })
      ).subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], status: 'Rejected', statusReason: curStatusReason}
          this.data = [...this.data]
        }
      })
  }
}
  goToInfo(object: TransactionListViewModel) {

  }
  selectBtnClicked(selectClickObject: {index: number,objs: TransactionListViewModel[]}) {

  }
}
