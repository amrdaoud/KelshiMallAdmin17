import { Routes } from '@angular/router';
import { authGuard } from './app-reusables/common/auth.guard';
import { UnauthorizedComponent } from './app-reusables/redirects/unauthorized/unauthorized.component';
import { NotFoundComponent } from './app-reusables/redirects/not-found/not-found.component';

export const routes: Routes = [
    {path:'', loadComponent:() => import('./side-nav/side-nav.component').then(c => c.SideNavComponent), canActivate:[authGuard], children: [
        {path: 'posts', loadComponent:() => import('./posts/post-list/post-list.component').then(c => c.PostListComponent), canActivate:[authGuard], data: {Roles: ['Super User','Post Manager']}},
        {path: 'posts/:postId', loadComponent:() => import('./posts/post-form/post-form.component').then(c => c.PostFormComponent), canActivate:[authGuard], data: {Roles: ['Super User','Post Manager']}},
        {path: 'user-manager', loadComponent:() => import('./user-manager/user-list/user-list.component').then(c => c.UserListComponent),canActivate:[authGuard], data: {Roles: ['Super User','User Manager']}},
        {path: 'user-manager/:id', loadComponent:() => import('./user-manager/user-info/user-info.component').then(c => c.UserInfoComponent), canActivate:[authGuard], data: {Roles: ['Super User','User Manager']}},
        {path: 'system-user-manager', loadComponent:() => import('./system-user-manager/system-user-list/system-user-list.component').then(c => c.SystemUserListComponent), canActivate:[authGuard], data: {Roles: ['Super User']}},
        {path: 'redeems', loadComponent:() => import('./transactions/redeem-list/redeem-list.component').then(c => c.RedeemListComponent), canActivate:[authGuard], data: {Roles: ['Super User','Account Manager']}},
        {path: 'categories', loadComponent:() => import('./categories/category-list/category-list.component').then(c => c.CategoryListComponent)},
        {path: 'transactions', loadComponent:() => import('./transactions/transaction-list/transaction-list.component').then(c => c.TransactionListComponent), canActivate:[authGuard], data: {Roles: ['Super User','Account Manager']}},
        {path: 'contact-messages', loadComponent:() => import('./contact-messages/contact-message-list/contact-message-list.component').then(c => c.ContactMessageListComponent), canActivate:[authGuard], data: {Roles: ['Super User','User Manager']}},
        {path: 'notification-wizard', loadComponent:() => import('./notifications/notification-wizard/notification-wizard.component').then(c => c.NotificationWizardComponent), canActivate:[authGuard], data: {Roles: ['Super User','Notification Manager']}},
        {path: 'notification-types', loadComponent:() => import('./notifications/notification-types/notification-types.component').then(c => c.NotificationTypesComponent), canActivate:[authGuard], data: {Roles: ['Super User', 'Notification Manager']}},
        {path: 'notification-manual', loadComponent:() => import('./notifications/notification-manual/notification-manual.component').then(c => c.NotificationManualComponent), canActivate:[authGuard], data: {Roles: ['Super User','Notification Manager']}},
        {path: 'notification-history', loadComponent:() => import('./notifications/notification-history/notification-history.component').then(c => c.NotificationHistoryComponent), canActivate:[authGuard], data: {Roles: ['Super User']}},
        {path: 'reports/membership-expiry', loadComponent:() => import('./reports/membership-expiry-report/membership-expiry-report.component').then(c => c.MembershipExpiryReportComponent), canActivate:[authGuard], data: {Roles: ['Super User']}},
        {path: 'upload-app', loadComponent:() => import('./web-app/upload-app-file/upload-app-file.component').then(c => c.UploadAppFileComponent), canActivate:[authGuard], data: {Roles: ['Super User']}},
        {path: 'delivery-providers', loadComponent:() => import('./delivery/delivery-provider-card-list/delivery-provider-card-list.component').then(c => c.DeliveryProviderCardListComponent)},
        {path: 'delivery-providers/add', loadComponent:() => import('./delivery/delivery-provider-info/delivery-provider-info.component').then(c => c.DeliveryProviderInfoComponent)},
        {path: 'delivery-providers/:id', loadComponent:() => import('./delivery/delivery-provider-info/delivery-provider-info.component').then(c => c.DeliveryProviderInfoComponent)},
        {path: 'orders', loadComponent:() => import('./orders/super-order-list/super-order-list.component').then(c => c.SuperOrderListComponent), canActivate:[authGuard], data: {Roles: ['Super User', 'Delivery Manager']}},
        {path: 'orders/provider/:id', loadComponent:() => import('./orders/super-order-provider-list/super-order-provider-list.component').then(c => c.SuperOrderProviderListComponent), canActivate:[authGuard], data: {Roles: ['Super User', 'Delivery Manager', 'Delivery Provider']}},
        {path: 'orders/:id', loadComponent:() => import('./orders/order-details/order-details.component').then(c => c.OrderDetailsComponent)},
        
    ]},
    {path:'login', loadComponent:() => import('./app-reusables/account/components/login/login.component').then(c => c.LoginComponent)},
    {path:'change-password', loadComponent:() => import('./app-reusables/account/components/change-password/change-password.component').then(c => c.ChangePasswordComponent)},
    {path:'403', component: UnauthorizedComponent},
    {path: '**', component: NotFoundComponent}
];
