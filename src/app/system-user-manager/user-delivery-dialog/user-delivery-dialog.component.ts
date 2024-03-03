import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../../delivery/delivery.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SystemUserListViewModel } from '../system-user-manager';
import { SystemUserManagerService } from '../system-user-manager.service';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map } from 'rxjs';
import { DeliveryProviderListViewModel } from '../../delivery/delivery';

@Component({
  selector: 'app-user-delivery-dialog',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule, FormsModule],
  templateUrl: './user-delivery-dialog.component.html',
  styleUrls: ['./user-delivery-dialog.component.scss']
})
export class UserDeliveryDialogComponent extends Unsubscriber {
  mainService = inject(SystemUserManagerService);
  deliveryService = inject(DeliveryService);
  dialogRef = inject(MatDialogRef<UserDeliveryDialogComponent>);
  loadingProviders$ = this.deliveryService.loadingProviders$;
  providers$ = this.deliveryService.getDeliveryProviders({PageIndex: 0, PageSize: 10000, SortActive: 'deliveryProviderId', SortDirection: 'asc'}).pipe(map(x => x.data as DeliveryProviderListViewModel[]));
  selectedProviders: number[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: SystemUserListViewModel, rowIndex: number}){
    super();
    this.selectedProviders = data.user.deliveryProviderIds;
  }
  submit() {
    this._otherSubscription = this.mainService.editDeliveryProviders({id: this.data.user.systemUserId, deliveryProviderIds: this.selectedProviders}, this.data.rowIndex).subscribe(x => {
      if(x) {
        this.dialogRef.close(this.selectedProviders);
      }
    })
  }
}
