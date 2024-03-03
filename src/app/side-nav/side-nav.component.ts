import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion'
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NameCircleComponent } from "../app-reusables/components/name-circle/name-circle.component";
import { DeviceService } from '../app-reusables/services/device.service';
import { ConfirmService } from '../app-reusables/confirm/services/confirm.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { Unsubscriber } from '../app-reusables/common/unsubscriber';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountService } from '../app-reusables/account/services/account.service';
import { getByRoles } from './models/side-nav.const';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-side-nav',
    standalone: true,
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    imports: [CommonModule, MatSidenavModule, MatTooltipModule,
        ReactiveFormsModule,MatListModule, MatIconModule, MatButtonModule, MatExpansionModule, RouterOutlet, MatMenuModule,
        RouterLink, RouterLinkActive, MatToolbarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, NameCircleComponent]
})
export class SideNavComponent extends Unsubscriber{
 opened = false;
 showNavLabels = false;
 device = inject(DeviceService);
 account = inject(AccountService);
 confirm = inject(ConfirmService);
 router = inject(Router);
 elements = getByRoles(this.account.getRoles());
 account$ = this.account.account$;
 handset$ = this.device.isHandset$;
 dateControl = new FormControl();
 productControl = new FormControl();
 constructor(){
    super();
    this._otherSubscription = this.router.events.pipe(
        filter(val => val instanceof NavigationEnd)
    ).subscribe(
        (n) => {
            this.dateControl.setValue('');
            this.productControl.setValue('');
            if(n instanceof NavigationEnd && n.url.startsWith('/inventory/products')) {
                this.productControl.disable();
            } else {
                this.productControl.enable();
            }
            if(n instanceof NavigationEnd && n.url.startsWith('/reports/sales')) {
                this.dateControl.disable();
            } else {
                this.dateControl.enable();
            }
        }
        )
    this.dateControl.valueChanges.pipe(
        filter(val => val),
        debounceTime(400),
        distinctUntilChanged()
    ).subscribe(val => {
        this.router.navigate(['/reports/sales'], {queryParams: {DateFrom: val, DateTo: val}})
    });
    this.productControl.valueChanges.pipe(
        filter(val => val),
        debounceTime(400)
    ).subscribe(val => {
        this.router.navigate(['/inventory/products'], {queryParams: {searchQuery: val}})
    });
 }
 @ViewChild(MatDrawer) drawer!: MatDrawer;
 logOut() {
    this._otherSubscription = this.confirm.open({Title: 'Logout', Message: 'Are you sure you want to logout', MatColor: 'warn'}).pipe(
        filter(result => result),
        tap(() => {
            this.account.logOut();
        })
    ).subscribe(x => {
        this.router.navigateByUrl('/login');
    });
    
 }
}
