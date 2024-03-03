import { SideNavElement } from "./side-nav";

export const sideNavElements: {top: SideNavElement[], middle?: SideNavElement[],bottom?: SideNavElement[]}  ={
    top: [
        {
            Name: 'User',
            Icon: 'users-icon',
            Route: 'user-manager',
            Roles: ['User Manager', 'Super User']
        },
        {
            Name: 'Posts',
            Icon: 'post-icon',
            Route: 'posts',
            Roles: ['Post Manager', 'Super User']
        },
        {
            Name: 'Categories',
            Icon: 'category-icon',
            Route: 'categories',
            Roles: ['User Manager', 'Super User', 'Post Manager']
        },
        {
            Name: 'Messages & Complaints',
            Icon: 'envelop-icon',
            Route: 'contact-messages',
            Roles: ['User Manager', 'Super User']
        }
    ],
    middle: [
        {
            Name: 'Transactions',
            Icon: 'transactions-icon',
            Route: 'transactions',
            Roles: ['Super User', 'Account Manager']
        },
        {
            Name: 'Redeem Codes',
            Icon: 'qr-icon',
            Route: 'redeems',
            Roles: ['Super User', 'Account Manager']
        },
        {
            Name: 'System Users',
            Icon: 'system-user-icon',
            Route: 'system-user-manager',
            Roles: ['Super User']
        },
        {
            Name: 'Send Notification',
            Icon: 'send-icon',
            Route: 'notification-types',
            Roles: ['Super User', 'Notification Manager']
        },
        {
            Name: 'Delivery Providers',
            Icon: 'delivery-icon',
            Route: 'delivery-providers',
            Roles: ['Super User', 'Delivery Manager', 'Delivery Provider']
        },
        {
            Name: 'Orders',
            Icon: 'order-icon',
            Route: 'orders',
            Roles: ['Super User', 'Delivery Manager']
        },
        {
            Name: 'Upload App',
            Icon: 'android-icon',
            Route: 'upload-app',
            Roles: ['Super User']
        },
        
        // {
        //     Name: 'Ledger',
        //     Icon: 'ledger-icon',
        //     Route: 'ledger',
        //     Roles: ['Manager', 'SuperUser']
        // }
    ]
}

export function getByRoles(roles: string[] | null): {top: SideNavElement[], middle?: SideNavElement[],bottom?: SideNavElement[]} {
    return {
        top: sideNavElements.top.filter(x => !x.Roles || roles?.find(r => x.Roles?.includes(r)) || roles?.includes('SuperUser')),
        middle: sideNavElements.middle?.filter(x => !x.Roles || roles?.find(r => x.Roles?.includes(r)) || roles?.includes('SuperUser')),
        bottom: sideNavElements.bottom?.filter(x => !x.Roles || roles?.find(r => x.Roles?.includes(r)) || roles?.includes('SuperUser')),
    }
}
 