import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMap, MapDirectionsRenderer, MapDirectionsService} from '@angular/google-maps';
import { Observable, delay, filter, map, of, switchMap, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeviceService } from '../../app-reusables/services/device.service';
import { StepProgressBarComponent } from "../../app-reusables/components/step-progress-bar/step-progress-bar.component";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderStatusModel, OrderViewModel } from '../order';
import { OrderService } from '../order.service';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { PostStatusReasonComponent } from '../../posts/post-status-reason/post-status-reason.component';
import { AccountService } from '../../app-reusables/account/services/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-order-details',
    standalone: true,
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
    imports: [CommonModule, GoogleMap, MapDirectionsRenderer, MatCardModule, FormsModule,
      MatGridListModule, StepProgressBarComponent, MatProgressBarModule,
      MatButtonModule, MatFormFieldModule, MatSelectModule]
})
export class OrderDetailsComponent {
  private deviceService = inject(DeviceService);
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private mapDirectionsService = inject(MapDirectionsService);
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);
  private account = inject(AccountService);
  selectedStatus: OrderStatusModel | undefined;
  statuses$ = this.orderService.getStatuses();
  isDeliveryManager = this.account.inRoles(['Super User', 'Delivery Manager']);
  loadingOrder$ = this.orderService.loadingOrder$;
  changingStatus$ = this.orderService.changingStatus$;
  order!: OrderViewModel;
  isHandset$ = this.deviceService.isHandset$;
  center: google.maps.LatLngLiteral = {lat: 34.8021, lng: 38.9968};
  zoom = 7;
  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined> = this.route.paramMap.pipe(
    switchMap((paramMap: ParamMap) => this.orderService.getOrderById(+paramMap.get('id')!)),
    tap((order: OrderViewModel) => this.order = order),
    switchMap((order: OrderViewModel) => {
      const request: google.maps.DirectionsRequest = {
        destination: {lat: order.buyerLat, lng: order.buyerLon},
        origin: {lat: order.sellerLat, lng: order.sellerLon},
        travelMode: "DRIVING" as google.maps.TravelMode.DRIVING
      };
      return this.mapDirectionsService.route(request).pipe(map(response => {return response.result}));
    })
  )
  accept() {
    this.confirm.open({Title: 'Accepting Order', Message: 'Are you sure you want to accept this order?', MatColor: 'primary'}).pipe(
      filter(result => result),
      switchMap(() => this.orderService.acceptOrder(this.order.orderId))
    ).subscribe(x => {
      if(x) {
        this.order = x;
      }
    })
  }
  reject() {
    this.confirm.open({Title: 'Rejecting Order', Message: 'Are you sure you want to reject/cancel this order?', MatColor: 'warn'}).pipe(
      filter(result => result),
      switchMap(() => this.dialog.open(PostStatusReasonComponent, {data: ''}).afterClosed()),
      filter(reason => reason),
      switchMap((reason: string) => this.orderService.rejectOrder(this.order.orderId, reason))
    ).subscribe(x => {
      if(x) {
        this.order = x
      }
    });
  }
  changeStatus(newStatus: OrderStatusModel) {
    this.confirm.open({Title: 'Change Status', Message: 'Are you sure you want to change this order status?', MatColor: 'primary'}).pipe(
      tap(() => this.selectedStatus = undefined),
      filter(result => result),
      switchMap(() => {
        if(!newStatus.isPending && !newStatus.isSuccess) {
          return this.dialog.open(PostStatusReasonComponent, {data: ''}).afterClosed();
        }
        else {
          return of(null)
        }
      }),
      filter(reason => newStatus.isPending || newStatus.isSuccess || reason),
      switchMap((reason: string) => this.orderService.changeStatus(this.order.orderId,newStatus.orderStatusId, reason))
    ).subscribe(x => {
      if(x) {
        this.order = x;
      }
    })
  }
}
