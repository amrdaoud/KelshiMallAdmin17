import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { DataTableFilter, DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { DeviceService } from '../../app-reusables/services/device.service';
import { GenericService } from '../../app-services/generic.service';
import { OrderFilterModel, OrderListViewModel } from '../order';
import { ordersConst } from '../order.const';
import { OrderService } from '../order.service';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';

@Component({
  selector: 'app-order-provider-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './order-provider-list.component.html',
  styleUrl: './order-provider-list.component.scss',
  providers: [LocaleDatePipe, CurrencyPipe]
})
export class OrderProviderListComponent extends Unsubscriber implements OnChanges {
  @Input() pending: boolean | undefined = undefined;
  @Input() success: boolean | undefined = undefined;
  @Input() title: string = 'Orders'
  private mainService = inject(OrderService);
  private genericService = inject(GenericService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private deviceService = inject(DeviceService);
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  data: any[] = [];
  dataSize!: number;
  filters: DataTableFilter[] = []
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return ordersConst.columns.filter(x => !x.HideHandset)
        }
        return ordersConst.columns
    })
  );
  ngOnChanges(changes: SimpleChanges): void {
    this.filters.push(
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
    this._otherSubscription = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        if(param.has("id") && !isNaN(+param.get("id")!)) {
          return this.mainService.getOrdersByProviderFilter(+param?.get("id")!, filter as OrderFilterModel, this.pending, this.success)
        }
        else {
          return of({data: [], dataSize: 0});
        }
      })
    )
      .subscribe(ds => {
          this.data = ds.data;
          this.dataSize = ds.dataSize;
      })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this._otherSubscription = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        if(param.has("id") && !isNaN(+param.get("id")!)) {
          return this.mainService.exportOrderByProviderFilter(+param?.get("id")!, filter as OrderFilterModel, this.pending, this.success)
        }
        else {
          return of(undefined);
        }
      })
    )
    .subscribe(x => {
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
