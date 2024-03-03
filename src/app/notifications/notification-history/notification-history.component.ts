import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { notificationHistoryConst } from '../notification.const';
import { map } from 'rxjs';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { NotificationHistoryFilterModel } from '../notification';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';

@Component({
  selector: 'app-notification-history',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './notification-history.component.html',
  styleUrls: ['./notification-history.component.scss'],
  providers: [LocaleDatePipe]
})
export class NotificationHistoryComponent extends Unsubscriber {
  mainService = inject(NotificationService);
  private deviceService = inject(DeviceService);
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  filters = notificationHistoryConst.filters;
  data: any[] = [];
  dataSize!: number;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return notificationHistoryConst.columns.filter(x => !x.HideHandset)
        }
        return notificationHistoryConst.columns
    })
  );
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService.getByFilter(filter as NotificationHistoryFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportByFilter(filter as NotificationHistoryFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `NotificationHistory-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
}
