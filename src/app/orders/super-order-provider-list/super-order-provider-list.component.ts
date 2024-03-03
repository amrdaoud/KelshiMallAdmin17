import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderProviderListComponent } from "../order-provider-list/order-provider-list.component";

@Component({
    selector: 'app-super-order-provider-list',
    standalone: true,
    templateUrl: './super-order-provider-list.component.html',
    styleUrl: './super-order-provider-list.component.scss',
    imports: [MatTabsModule, OrderProviderListComponent]
})
export class SuperOrderProviderListComponent {

}
