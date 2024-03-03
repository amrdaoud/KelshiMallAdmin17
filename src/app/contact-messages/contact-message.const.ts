import { of } from "rxjs";
import { ColumnDef, DataTableButtonObject, DataTableFilter, GeneralFilterModel } from "../app-reusables/data-table/data-table.models";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";

export const contactMessageConst :
{columns: ColumnDef[], initialFilter?: GeneralFilterModel, filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[], selectBtns?: DataTableButtonObject[]} = {
    columns: [
        {Name: "Read?", Property: "status", IsSort: true, Tooltip: 'status', Highlights: [
            {Operation: '=', Value: "Unread", Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,1)', AltText:" "},
            {Operation: '=', Value: "Read", Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 1)', AltText: " "},
        ]},
        {Name: "#", Property: "contactMessageId"},
        {Name: "Date", Property: "messageDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Mobile", Property: "mobileNumber"},
        {Name: "Store", Property: "storeTitle", IsSort: true},
        {Name: "Name", Property: "name", IsSort: true},
        {Name: "Title", Property: "title", IsSort: true}
    ],
    initialFilter: {
        PageIndex: 0,
        PageSize: 30,
        SortActive: "messageDate",
        SortDirection: "desc"
    },
    filters: [
        {
            Type: 'twoDates',
            ControlName: 'DateFrom',
            PlaceHolder: 'Start Date',
            ControlName2: 'DateTo',
            PlaceHolder2: "End Date",
            UpdateOn: 'blur'
        },
        {
            Type: 'select',
            ControlName: 'Status',
            DisplayProperty: 'Name',
            ValueProperty: 'Id',
            PlaceHolder: 'Status',
            UpdateOn: 'change',
            Data: of([{Id: 'Read', Name: 'Read'}, {Id: 'Unread', Name: 'Unread'}])
        }
    ],
    menuButtons: [
        // {
        //     Text: 'Attachment',
        //     Icon: 'attach_file',
        //     MatColor: 'primary',
        //     HideWhen: {
        //         Property: 'attachmentUrl',
        //         Value: null
        //     }
        // },
        // {
        //     Text: 'Accept Payment',
        //     Icon: 'verified_user',
        //     MatColor: 'primary',
        //     ShowWhen: {
        //         Property: 'status',
        //         Value: 'Pending'
        //     }
        // },
        // {
        //     Text: 'Reject Payment',
        //     Icon: 'gpp_bad',
        //     MatColor: 'warn',
        //     ShowWhen: {
        //         Property: 'status',
        //         Value: 'Pending'
        //     }
        // },
        // // {
        // //     Text: 'Deactivate Account',
        // //     Icon: 'toggle_off',
        // //     MatColor: 'warn',
        // //     HideWhen: {
        // //         Property: 'isActive',
        // //         Value: false
        // //     }
        // // }
    ],
}