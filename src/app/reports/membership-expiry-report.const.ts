import { CurrencyPipe } from "@angular/common";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { MembershipExpiryReportFilterModel } from "./report";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";

export const membershipExpiryReportConst :
{columns: ColumnDef[], initialFilter?: MembershipExpiryReportFilterModel,buttons?: DataTableButtonObject[], filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[], selectBtns?: DataTableButtonObject[]} = {
    columns: [
        {Name: "Mobile", Property: "mobileNumber"},
        {Name: "Store", Property: "storeName", IsSort: true},
        
        // {Name: "Whatsapp", Property: "whatsAppNumber"},
        {Name: "Membership", Property:"membershipName", IsSort: true},
        {Name: "City", Property: "city", IsSort: true},
        {Name: "Area", Property: "area", IsSort: true},
        {Name: "Posts", Property: "totalPosts", IsSort: true},
        {Name: "Active Posts", Property: "totalActivePosts", IsSort: true},
        {Name: "Balance", Property: "walletBalance", IsSort: true, Pipe: CurrencyPipe},
        {Name: "Purchases", Property: "totalPurshaces", IsSort: true, Pipe: CurrencyPipe},
        {Name: "Status", Property: "isActive", IsSort: true, Highlights: [
            {Operation: '=', Value: true, AltText: 'Active', Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
            {Operation: '=', Value: false, AltText: 'Inactive', Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
        ]},
        {Name: "Seen", Property: "lastSeen", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},

        {Name: "Created", Property: "creationDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Membership Expire", Property:"membershipEndDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Whatsapp", Property: "whatsAppNumber"},
        {Name: "User#", Property: "userId", IsSort: true},
    ],
    initialFilter: {
        PageIndex: 0,
        PageSize: 30,
        SortActive: "creationDate",
        SortDirection: "desc",
        expiryInDays: 7
    },
    filters: [
        {
            Type: 'input',
            ControlName: 'expiryInDays',
            Label: 'Expiry in (Days)',
            MinValue: 0,
            MaxValue: 30
        },
    ],
    menuButtons: [
        // {
        //     Text: 'Activate Account',
        //     Icon: 'toggle_on',
        //     MatColor: 'primary',
        //     HideWhen: {
        //         Property: 'isActive',
        //         Value: true
        //     }
        // },
        // {
        //     Text: 'Deactivate Account',
        //     Icon: 'toggle_off',
        //     MatColor: 'warn',
        //     HideWhen: {
        //         Property: 'isActive',
        //         Value: false
        //     }
        // }
    ],
    selectBtns: [
        // {
        //     Text: 'Send SMS',
        //     Icon: 'message',
        //     MatColor: 'primary'
        // }
    ],
    buttons : [
        // {
        //     Text: 'Force Policy Acceptance',
        //     Icon: 'policy',
        //     MatColor: 'primary'
        // }
    ]
}