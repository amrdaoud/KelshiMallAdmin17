import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { DeviceService } from '../../app-reusables/services/device.service';
import { DeliveryService } from '../delivery.service';
import { map } from 'rxjs';
import { DeliveryProviderListViewModel } from '../delivery';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-delivery-provider-card-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './delivery-provider-card-list.component.html',
  styleUrls: ['./delivery-provider-card-list.component.scss']
})
export class DeliveryProviderCardListComponent {
  private deviceService = inject(DeviceService);
  private deliveryService = inject(DeliveryService);
  private router = inject(Router);
  isHandset$ = this.deviceService.isHandset$;
  providers$ = this.deliveryService.getDeliveryProviders({PageIndex: 0, PageSize: 100, SortActive: 'deliveryProviderId', SortDirection: 'asc'}).pipe(
    map(x => x.data as DeliveryProviderListViewModel[])
  )
  goToEdit(id: number) {
    this.router.navigateByUrl('/delivery-providers/' + id);
  }
  goToOrders(id: number) {
    this.router.navigateByUrl('/orders/provider/' + id);
  }
}
