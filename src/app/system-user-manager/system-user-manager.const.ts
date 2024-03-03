import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { SystemUserFilterModel } from "./system-user-manager";

export const systemUserManagerConst :
{columns: ColumnDef[], initialFilter?: SystemUserFilterModel,btns?:DataTableButtonObject[], filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[], selectBtns?: DataTableButtonObject[]} = {
    columns: [
        {Name: "#", Property: "systemUserId"},
        {Name: "Username", Property: "username", IsSort: true},
        {Name: "Name", Property:"fullName", IsSort: true},
        {Name: "Created", Property: "creationDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Status", Property: "isActive", IsSort: true, Highlights: [
            {Operation: '=', Value: true, AltText: 'Active', Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
            {Operation: '=', Value: false, AltText: 'Inactive', Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
        ]},
        {Name: "Roles", Property: "roles"},
    ],
    menuButtons: [
        {
            Text: 'Change Roles',
            Icon: 'accessibility'
        },
        {
            Text: 'Activate Account',
            Icon: 'toggle_on',
            MatColor: 'primary',
            HideWhen: {
                Property: 'isActive',
                Value: true
            }
        },
        {
            Text: 'Deactivate Account',
            Icon: 'toggle_off',
            MatColor: 'warn',
            HideWhen: {
                Property: 'isActive',
                Value: false
            }
        },
        {
            Text: 'Change Password',
            Icon: 'password',
            MatColor: 'warn',
        },
        {
            Text: 'Link To Providers',
            Icon: 'local_shipping',
            HideWhen: {
                Property: 'isDelivery',
                Value: false
            }
        },
    ],
    btns: [
        {
            Text: 'Add New User',
            Icon: 'add',
            MatColor: 'primary',
        }
    ]
}
