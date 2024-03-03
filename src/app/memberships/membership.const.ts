import { of } from "rxjs";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { MembershipHistoryFilterModel } from "./membership";

export const membershipHistoryConst :
{columns: ColumnDef[], initialFilter?: MembershipHistoryFilterModel, filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[]} = {
    columns: [
        {Name: "Name", Property: "name", IsSort: true},
        {Name: "NameAr", Property: "nameAr", IsSort: true},
        {Name: "Type", Property: "type", IsSort: true},
        {Name: "Date", Property: "subscriptionDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Expire", Property: "expiryDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Post Days", Property: "postDays", IsSort: true},
        {Name: "Status", Property: "status", IsSort: true, Highlights: [
            {Operation: '=', Value: "Active", Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
            {Operation: '=', Value: "Freezed", Color: 'rgb(255,166,97)', BackgroundColor: 'rgba(255,166,97,0.3)'},
            {Operation: '=', Value: "Expired", Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
        ]}
    ],
    initialFilter: {
        PageIndex: 0,
        PageSize: 30,
        SortActive: "subscriptionDate",
        SortDirection: "desc"
    },
    filters: [
        {
            Type: 'date',
            ControlName: 'SubscribedAfter',
            PlaceHolder: 'Subscribed After',
            UpdateOn: 'blur'
        },
        {
            Type: 'date',
            ControlName: 'ExpiredBefore',
            PlaceHolder: 'Expired Before',
            UpdateOn: 'blur'
        },
        {
            Type: 'select',
            ControlName: 'Status',
            DisplayProperty: 'Name',
            ValueProperty: 'Id',
            PlaceHolder: 'Status',
            UpdateOn: 'change',
            Data: of([{Id: 'Expired', Name: 'Expired'}, {Id: 'Freezed', Name: 'Freezed'}, {Id: 'Active', Name: 'Active'}])
        }
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
    ]
}