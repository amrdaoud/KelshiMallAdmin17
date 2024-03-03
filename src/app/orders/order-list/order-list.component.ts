import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { OrderService } from '../order.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { ordersConst } from '../order.const';
import { map } from 'rxjs';
import { OrderFilterModel, OrderListViewModel } from '../order';
import { DataTableFilter, DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { DeliveryService } from '../../delivery/delivery.service';
import { GenericService } from '../../app-services/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  providers: [LocaleDatePipe, CurrencyPipe]
})
export class OrderListComponent extends Unsubscriber implements OnChanges  {
  @Input() pending: boolean | undefined = undefined;
  @Input() success: boolean | undefined = undefined;
  @Input() title: string = 'Orders';
  private mainService = inject(OrderService);
  private deliveryService = inject(DeliveryService);
  private genericService = inject(GenericService);
  private deviceService = inject(DeviceService);
  private router = inject(Router);
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  data: any[] = [];
  dataSize!: number;
  filters: DataTableFilter[] = [];
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return ordersConst.columns.filter(x => !x.HideHandset)
        }
        return ordersConst.columns
    })
  );
  ngOnChanges(changes: SimpleChanges): void {
    this.filters.push({
      Type: 'select',
      ControlName: 'providerId',
      PlaceHolder: 'Delivery Provider',
      Data: this.deliveryService.getDeliveryProviders(
        {
          PageIndex: 0,
          PageSize: 10000,
          SortActive: 'deliveryProviderId',
          SortDirection: 'asc'
        }
      ).pipe(
        map(x => x.data)
      ),
      DisplayProperty: 'name',
      ValueProperty: 'deliveryProviderId'
    },
    {
      Type: 'select',
      ControlName: 'statusIds',
      PlaceHolder: 'Status',
      IsMulti: true,
      Data: this.mainService.getStatuses(this.pending),
      DisplayProperty: 'orderStatusName',
      ValueProperty: 'orderStatusId'
    },
    {
      Type: 'select',
      ControlName: 'cities',
      PlaceHolder: 'City',
      IsMulti: true,
      Data: this.genericService.cities$,
      DisplayProperty: 'nameAr',
      ValueProperty: 'nameAr'
    });
  }
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService.getOrdersByFilter(filter as OrderFilterModel, this.pending, this.success)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportOrderByFilter(filter as OrderFilterModel, this.pending, this.success).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Orders-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  rowClick(order: OrderListViewModel) {
    this.router.navigateByUrl('/orders/' + order.orderId);
  }

}
