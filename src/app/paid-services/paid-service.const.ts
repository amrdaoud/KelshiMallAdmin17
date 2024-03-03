import { CurrencyPipe } from "@angular/common";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { of } from "rxjs";
import { PaidServiceHistoryFilterModel } from "./paid-service";

export const paidServiceConst :
{columns: ColumnDef[], initialFilter?: PaidServiceHistoryFilterModel, filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[], btns?: DataTableButtonObject[]} = {
    columns: [
        {Name: "Post", Property: "postTitle", IsSort: true},
        {Name: "Name", Property: "nameAr", IsSort: true},
        {Name: "Description", Property: "descriptionAr"},
        {Name: "Date", Property: "date", Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Days", Property: "validityValue", IsSort: true},
        {Name: "Price", Property: "price", IsSort: true, Pipe: CurrencyPipe},
        {Name: "Repeate at", Property: "hour"},
        {Name: "Active?", Property: "isActive", IsSort: true, Highlights: [
            {Operation: '=', Value: true, AltText: "Yes", Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
            {Operation: '=', Value: false,AltText: "No", Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
        ]}
    ],
    initialFilter: {
        PageIndex: 0,
        PageSize: 30,
        SortActive: "Date",
        SortDirection: "desc"
    },
    filters: [
        // {
        //     Type: 'twoDates',
        //     ControlName: 'DateFrom',
        //     PlaceHolder: 'Start Date',
        //     ControlName2: 'DateTo',
        //     PlaceHolder2: "End Date",
        //     UpdateOn: 'blur'
        // },
        // {
        //     Type: 'select',
        //     ControlName: 'Status',
        //     DisplayProperty: 'Name',
        //     ValueProperty: 'Id',
        //     PlaceHolder: 'Status',
        //     UpdateOn: 'change',
        //     Data: of([{Id: 'Completed', Name: 'Completed'}, {Id: 'Pending', Name: 'Pending'}, {Id: 'Rejected', Name: 'Rejected'}])
        // }
    ],
    menuButtons: [
        {
            Text: 'Deactivate Service',
            Icon: 'toggle_off',
            MatColor: 'warn',
            HideWhen: {
                Property: 'isActive',
                Value: false
            }
        }
    ]
}