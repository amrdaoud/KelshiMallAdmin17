import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReportService } from '../report.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { map } from 'rxjs';
import { membershipExpiryReportConst } from '../membership-expiry-report.const';
import { MembershipService } from '../../memberships/membership.service';
import { DataTableFilter, DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { MembershipExpiryReportFilterModel } from '../report';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';

@Component({
  selector: 'app-membership-expiry-report',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './membership-expiry-report.component.html',
  styleUrls: ['./membership-expiry-report.component.scss'],
  providers: [CurrencyPipe, LocaleDatePipe]
})
export class MembershipExpiryReportComponent extends Unsubscriber {
  private mainService = inject(ReportService);
  private deviceService = inject(DeviceService);
  private membershipService = inject(MembershipService);
  isLoading$ = this.mainService.loadingMembershipExpiryReport$;
  isDownloading$ = this.mainService.downloadingMembershipExpiryReport$;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return membershipExpiryReportConst.columns.filter(x => !x.HideHandset)
        }
        return membershipExpiryReportConst.columns
    })
  );
  extraFilters: DataTableFilter[] = [
    {
      Type: 'select',
      ControlName: 'MembershipIds',
      DisplayProperty: 'name',
      ValueProperty: 'membershipId',
      PlaceHolder: 'Membership',
      UpdateOn: 'blur',
      IsMulti: true,
      Data: this.membershipService.getMemberships(),
      IsLoading: this.membershipService.loading$
    }
  ]
  filters = [...membershipExpiryReportConst.filters!,...this.extraFilters];
  menuButtons = membershipExpiryReportConst.menuButtons;
  selectButtons = membershipExpiryReportConst.selectBtns;
  btns = membershipExpiryReportConst.buttons;
  data: any[] = [];
  dataSize!: number;
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService.getMembershipExpiryReport(filter as MembershipExpiryReportFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportMembershipExpiryReport(filter as MembershipExpiryReportFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Membership-Expiry-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
}
