import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FcmNotificationService } from './app-services/fcm-notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, tap } from 'rxjs';
import { AccountService } from './app-reusables/account/services/account.service';
import { PostNotificationComponent } from './notifications/post-notification/post-notification.component';
import { HOME_ICON, CART_ICON, DASHBOARD_ICON, PRODUCT_ICON, USERS_ICON, SETTINGS_ICON, SEARCH_ICON, CALENDAR_ICON, FILTER_ICON, SAVE_ICON, POS_ICON, PAY_ICON, PRINT_ICON, LOGOUT_ICON, LOGIN_ICON, LEDGER_ICON, ACTION_ICON, TABLE_ICON, HAPPY_ICON, SAD_ICON, AVERAGE_ICON, INSTAGRAM_ICON, YOUTUBE_ICON, FACEBOOK_ICON, WEBSITE_ICON, CATEGORY_ICON, CREDIT_ICON, CASH_ICON, EPAYMENT_ICON, GIFTCARD_ICON, APP_STORE_ICON, PLAY_STORE_ICON, POST_ICON, QR_ICON, SYSTEM_USER_ICON, TRANSACTIONS_ICON, ENVELOP_ICON, SEND_ICON, ANDROID_ICON, PLACE_ICON, DELIVERY_ICON, ORDER_ICON } from '../app-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private fcmNotification = inject(FcmNotificationService);
  private notificationSnacBar = inject(MatSnackBar);
  private router = inject(Router);
  private account = inject(AccountService);
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){    
    if (this.account.isTokenExpired()) {
      this.account.logOut();
    }
    this.fcmNotification.listen();
    this.fcmNotification.message$.pipe(
      filter(payload => payload != undefined),
      tap(payload => {
        this.notificationSnacBar.openFromComponent(PostNotificationComponent, {data: payload, horizontalPosition:'right', panelClass: 'notification-snack'});
      })
    ).subscribe();
    iconRegistry.addSvgIconLiteral('home-icon', sanitizer.bypassSecurityTrustHtml(HOME_ICON));
    iconRegistry.addSvgIconLiteral('cart-icon', sanitizer.bypassSecurityTrustHtml(CART_ICON));
    iconRegistry.addSvgIconLiteral('dashboard-icon', sanitizer.bypassSecurityTrustHtml(DASHBOARD_ICON));
    iconRegistry.addSvgIconLiteral('product-icon', sanitizer.bypassSecurityTrustHtml(PRODUCT_ICON));
    iconRegistry.addSvgIconLiteral('users-icon', sanitizer.bypassSecurityTrustHtml(USERS_ICON));
    iconRegistry.addSvgIconLiteral('settings-icon', sanitizer.bypassSecurityTrustHtml(SETTINGS_ICON));
    iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('calendar-icon', sanitizer.bypassSecurityTrustHtml(CALENDAR_ICON));
    iconRegistry.addSvgIconLiteral('filter-icon', sanitizer.bypassSecurityTrustHtml(FILTER_ICON));
    iconRegistry.addSvgIconLiteral('save-icon', sanitizer.bypassSecurityTrustHtml(SAVE_ICON));
    iconRegistry.addSvgIconLiteral('pos-icon', sanitizer.bypassSecurityTrustHtml(POS_ICON));
    iconRegistry.addSvgIconLiteral('pay-icon', sanitizer.bypassSecurityTrustHtml(PAY_ICON));
    iconRegistry.addSvgIconLiteral('print-icon', sanitizer.bypassSecurityTrustHtml(PRINT_ICON));
    iconRegistry.addSvgIconLiteral('logout-icon', sanitizer.bypassSecurityTrustHtml(LOGOUT_ICON));
    iconRegistry.addSvgIconLiteral('login-icon', sanitizer.bypassSecurityTrustHtml(LOGIN_ICON));
    iconRegistry.addSvgIconLiteral('ledger-icon', sanitizer.bypassSecurityTrustHtml(LEDGER_ICON));
    iconRegistry.addSvgIconLiteral('action-icon', sanitizer.bypassSecurityTrustHtml(ACTION_ICON));
    iconRegistry.addSvgIconLiteral('table-icon', sanitizer.bypassSecurityTrustHtml(TABLE_ICON));
    iconRegistry.addSvgIconLiteral('happy-icon', sanitizer.bypassSecurityTrustHtml(HAPPY_ICON));
    iconRegistry.addSvgIconLiteral('sad-icon', sanitizer.bypassSecurityTrustHtml(SAD_ICON));
    iconRegistry.addSvgIconLiteral('average-icon', sanitizer.bypassSecurityTrustHtml(AVERAGE_ICON));
    iconRegistry.addSvgIconLiteral('instagram-icon', sanitizer.bypassSecurityTrustHtml(INSTAGRAM_ICON));
    iconRegistry.addSvgIconLiteral('youtube-icon', sanitizer.bypassSecurityTrustHtml(YOUTUBE_ICON));
    iconRegistry.addSvgIconLiteral('facebook-icon', sanitizer.bypassSecurityTrustHtml(FACEBOOK_ICON));
    iconRegistry.addSvgIconLiteral('website-icon', sanitizer.bypassSecurityTrustHtml(WEBSITE_ICON));
    iconRegistry.addSvgIconLiteral('category-icon', sanitizer.bypassSecurityTrustHtml(CATEGORY_ICON));
    iconRegistry.addSvgIconLiteral('credit-icon', sanitizer.bypassSecurityTrustHtml(CREDIT_ICON));
    iconRegistry.addSvgIconLiteral('cash-icon', sanitizer.bypassSecurityTrustHtml(CASH_ICON));
    iconRegistry.addSvgIconLiteral('epayment-icon', sanitizer.bypassSecurityTrustHtml(EPAYMENT_ICON));
    iconRegistry.addSvgIconLiteral('giftcard-icon', sanitizer.bypassSecurityTrustHtml(GIFTCARD_ICON));
    iconRegistry.addSvgIconLiteral('apple-store-icon', sanitizer.bypassSecurityTrustHtml(APP_STORE_ICON));
    iconRegistry.addSvgIconLiteral('play-store-icon', sanitizer.bypassSecurityTrustHtml(PLAY_STORE_ICON));
    iconRegistry.addSvgIconLiteral('post-icon', sanitizer.bypassSecurityTrustHtml(POST_ICON));
    iconRegistry.addSvgIconLiteral('qr-icon', sanitizer.bypassSecurityTrustHtml(QR_ICON));
    iconRegistry.addSvgIconLiteral('system-user-icon', sanitizer.bypassSecurityTrustHtml(SYSTEM_USER_ICON));
    iconRegistry.addSvgIconLiteral('transactions-icon', sanitizer.bypassSecurityTrustHtml(TRANSACTIONS_ICON));
    iconRegistry.addSvgIconLiteral('envelop-icon', sanitizer.bypassSecurityTrustHtml(ENVELOP_ICON));
    iconRegistry.addSvgIconLiteral('send-icon', sanitizer.bypassSecurityTrustHtml(SEND_ICON));
    iconRegistry.addSvgIconLiteral('android-icon', sanitizer.bypassSecurityTrustHtml(ANDROID_ICON));
    iconRegistry.addSvgIconLiteral('place-icon', sanitizer.bypassSecurityTrustHtml(PLACE_ICON));
    iconRegistry.addSvgIconLiteral('delivery-icon', sanitizer.bypassSecurityTrustHtml(DELIVERY_ICON));
    iconRegistry.addSvgIconLiteral('order-icon', sanitizer.bypassSecurityTrustHtml(ORDER_ICON));
  }
  title = 'Kelshi Mall Admin';
}
