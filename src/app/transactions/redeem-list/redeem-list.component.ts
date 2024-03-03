import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { redeemConsts } from '../transaction.const';
import { map } from 'rxjs';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { TransactionService } from '../transaction.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { RedeemCodeFilterModel, RedeemCodeListViewModel } from '../transactions';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RedeemInfoComponent } from '../redeem-info/redeem-info.component';
import { MatDialog } from '@angular/material/dialog';
import { RedeemGeneratorComponent } from '../redeem-generator/redeem-generator.component';

@Component({
  selector: 'app-redeem-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent, MatBottomSheetModule],
  templateUrl: './redeem-list.component.html',
  styleUrls: ['./redeem-list.component.scss'],
  providers: [CurrencyPipe, LocaleDatePipe]
})
export class RedeemListComponent extends Unsubscriber {
  private mainService = inject(TransactionService);
  private deviceService = inject(DeviceService);
  private bottomSheet = inject(MatBottomSheet);
  private dialog = inject(MatDialog);
  isLoading$ = this.mainService.loadingRedeemList$;
  isDownloading$ = this.mainService.loadingRedeemListDownload$;
  filters = redeemConsts.filters;
  menuButtons = redeemConsts.menuButtons;
  selectButtons = redeemConsts.selectBtns;
  btns = redeemConsts.btns;
  latestFilter!: DataTableOutput;
  data: any[] = [];
  dataSize!: number;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return redeemConsts.columns.filter(x => !x.HideHandset)
        }
        return redeemConsts.columns
    })
  );
  tableChange(filter: DataTableOutput) {
    this.latestFilter = filter;
    this._otherSubscription = this.mainService.getRedeemsByFilter(filter as RedeemCodeFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportRedeemsByFilter(filter as RedeemCodeFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `RedeemCodes-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  tableBtnClicked(index: number) {
    if(index == 0) {
      this.dialog.open(RedeemGeneratorComponent).afterClosed().subscribe(result => {
        if(result) {
          this.tableChange(this.latestFilter);
        }
      })
    }
  }
  tableMenuClicked(menuClickObject:{index: number, obj: RedeemCodeListViewModel, objIndex: number}) {

  }
  goToInfo(object: RedeemCodeListViewModel) {
    this.bottomSheet.open(RedeemInfoComponent, {data: object}).afterDismissed().subscribe(x => {
      if(x) {
        this.tableChange(this.latestFilter);
      }
    })
  }
  selectBtnClicked(selectClickObject: {index: number,objs: RedeemCodeListViewModel[]}) {

  }
}
