import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'
import { OrderListComponent } from "../order-list/order-list.component";
@Component({
    selector: 'app-super-order-list',
    standalone: true,
    templateUrl: './super-order-list.component.html',
    styleUrl: './super-order-list.component.scss',
    imports: [MatTabsModule, OrderListComponent]
})
export class SuperOrderListComponent {

}
