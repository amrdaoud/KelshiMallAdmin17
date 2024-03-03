import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ContactMessageService } from '../contact-message.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { contactMessageConst } from '../contact-message.const';
import { filter, map, switchMap } from 'rxjs';
import { ContactMessageFilterModel, ContactMessageListViewModel } from '../contact-message';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ContactMessageInfoComponent } from '../contact-message-info/contact-message-info.component';

@Component({
  selector: 'app-contact-message-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './contact-message-list.component.html',
  styleUrls: ['./contact-message-list.component.scss'],
  providers: [LocaleDatePipe]
})
export class ContactMessageListComponent extends Unsubscriber{
  mainService = inject(ContactMessageService);
  private deviceService = inject(DeviceService);
  private dialog = inject(MatDialog);
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  filters = contactMessageConst.filters;
  menuButtons = contactMessageConst.menuButtons;
  loadingRow$ = this.mainService.loadingRow$;
  selectButtons = contactMessageConst.selectBtns;
  data: any[] = [];
  dataSize!: number;
  latestFilter!: DataTableOutput;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return contactMessageConst.columns.filter(x => !x.HideHandset)
        }
        return contactMessageConst.columns
    })
  );
  tableChange(filter: DataTableOutput) {
    this.latestFilter = filter;
    this._otherSubscription = this.mainService.getByFilter(filter as ContactMessageFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportByFilter(filter as ContactMessageFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Contact-Messages-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  tableMenuClicked(menuClickObject:{index: number, obj: ContactMessageListViewModel, objIndex: number}) {
    // if(menuClickObject.index == 0) {
    //   window.open(menuClickObject.obj.attachmentUrl, '_blank');
    // }
    // if(menuClickObject.index == 1) {
    //   this.confirm.open({Message: 'Are you sure you want to accept this payment?'})
    //   .pipe(
    //     filter(result => result),
    //     switchMap(() => this.mainService.acceptTransaction(menuClickObject.obj.transactionId, menuClickObject.objIndex))
    //   ).subscribe(result => {
    //     if(result) {
    //       this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], status: 'Completed'}
    //       this.data = [...this.data]
    //     }
    //   })
    // } else if(menuClickObject.index == 2) {
    //   this.confirm.open({Message: 'Are you sure you want to reject this payment?', MatColor:'warn'})
    //   .pipe(
    //     filter(result => result),
    //     switchMap(() => this.mainService.rejectTransaction(menuClickObject.obj.transactionId, menuClickObject.objIndex))
    //   ).subscribe(result => {
    //     if(result) {
    //       this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], status: 'Rejected'}
    //       this.data = [...this.data]
    //     }
    //   })
    // }
  }
  goToInfo(object: ContactMessageListViewModel) {
    this._otherSubscription = this.dialog.open(ContactMessageInfoComponent, {data: object, panelClass: 'contact-message-info-dialog'}).afterClosed().pipe(
      filter(val => val),
      switchMap((val: string) => {
        if(val === 'Read') {
          return this.mainService.readMessage(object.contactMessageId, -1);
        }
        else {
          return this.mainService.unReadMessage(object.contactMessageId, -1);
        }
      })
    ).subscribe(m => {
      if(m) {
        this.tableChange(this.latestFilter);
      }
    })
  }
  selectBtnClicked(selectClickObject: {index: number,objs: ContactMessageListViewModel[]}) {

  }

}
