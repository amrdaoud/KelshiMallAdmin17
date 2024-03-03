import { CurrencyPipe, DatePipe } from "@angular/common";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { PostFilterModel } from "./post";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { of } from "rxjs";

export const postListColumns: ColumnDef[] = [
    {Name: "#", Property: "postId", IsSort: true},
    {Name: "Date", Property: "postingDate", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
    {Name: "Title", Property: "title", IsSort: true, Tooltip: "Description"},

    {Name: "Price", Property: "price", IsSort: true, Pipe: CurrencyPipe},
    {Name: "Store", Property: "storeName", IsSort: true},
    {Name: "Mobile", Property: "mobileNumber"},
    {Name: "Changed By", Property: "lastActivatedBy", IsSort: true},
    {Name: "User", Property: "userName", IsSort: true},
    {Name: "Status", Property: "status", Tooltip: "statusReason", IsSort: true, Highlights: [
        {Operation: '=', Value: "Active", Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
        {Operation: '=', Value: "Deleted", Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'},
        {Operation: '=', Value: "Inactive", Color: 'rgb(47,47,47)', BackgroundColor: 'rgba(47,47,47,0.2)'},
        {Operation: '=', Value: "Outdated", Color: 'rgb(96,63,64)', BackgroundColor: 'rgba(96,63,64,0.2)'},
        {Operation: '=', Value: "Refused", Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'},
        {Operation: '=', Value: "Pending", Color: 'rgb(255,166,97)', BackgroundColor: 'rgba(255,166,97,0.3)'},
    ]},
    {Name: "Dynamic Status", Property: "dynamicStatus", Tooltip: "statusReason", IsSort: true},
    {Name: "City", Property: "city", IsSort: true},
    {Name: "Area", Property: "area", IsSort: true},
    {Name: "Reason", Property: "statusReason"},
    {Name: "Reported", Property: "totalReports", IsSort: true},
    {Name: "Category#", Property: "categoryId", IsSort: true},
    {Name: "Category", Property: "categoryName", IsSort: true},
    {Name: "Parent Category#", Property: "parentCategoryId", IsSort: true},
    {Name: "Parent Category", Property: "parentCategoryName", IsSort: true},
    {Name: "Views", Property: "totalViews", IsSort: true},
    {Name: "Calls", Property: "totalCalls", IsSort: true},
    {Name: "Favorites", Property: "totalFavorites", IsSort: true},
    {Name: "Featured?", Property: "isFeatured", IsSort: true},
    {Name: "Feature Date", Property: "featureDate", IsSort: true, Pipe: LocaleDatePipe},
    {Name: "Feature Days", Property: "featureDays", IsSort: true},
    {Name: "Reposted?", Property: "isReposted", IsSort: true},
    {Name: "Repost Date", Property: "repostDate", IsSort: true, Pipe: LocaleDatePipe},
    {Name: "Repost Hour", Property: "repostHour", IsSort: true},
    {Name: "Negotiable?", Property: "isNegotiable", IsSort: true},
    {Name: "Store#", Property: "storeId", IsSort: true},
    {Name: "User#", Property: "userId", IsSort: true},
    
    // {Name: "Status", Property: "status", IsSort: true}
];

export const postInitialFilter: PostFilterModel = {
    PageIndex: 0,
    PageSize: 30,
    SortActive: "PostId",
    SortDirection: "desc"
}
export const postMenuBtns: DataTableButtonObject[] = [
    {
        Text: 'Notify user about post',
        Icon: 'notifications',
        MatColor: 'primary',
    },
    {
        Text: 'Notify others about post',
        Icon: 'notifications',
        MatColor: 'warn',
        ShowWhen: {
            Property: 'dynamicStatus',
            Value: 'Active'
        }
    }
]


export const postFilters: DataTableFilter[] = [
    {
        Type: 'twoDates',
        ControlName: 'DateFrom',
        ControlName2: 'DateTo',
        PlaceHolder: 'Posted After',
        PlaceHolder2: 'Posted Before',
        UpdateOn: 'blur'
    },
    {
        Type: 'select',
        ControlName: 'Status',
        PlaceHolder: 'Status',
        UpdateOn: 'blur',
        Data: of([{Name: 'Active'},{Name: 'Pending'},{Name: 'Inactive'},{Name: 'Refused'},{Name: 'Deleted'}, {Name: 'Outdated'}]),
        DisplayProperty: 'Name',
        ValueProperty: 'Name'
    },
    {
        Type: 'select',
        ControlName: 'IsFeatured',
        PlaceHolder: 'Featured?',
        UpdateOn: 'blur',
        Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
        DisplayProperty: 'Name',
        ValueProperty: 'Value'
    },
    {
        Type: 'select',
        ControlName: 'IsReposted',
        PlaceHolder: 'Reposted?',
        UpdateOn: 'blur',
        Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
        DisplayProperty: 'Name',
        ValueProperty: 'Value'
    },
    {
        Type: 'select',
        ControlName: 'IsReported',
        PlaceHolder: 'Reported?',
        UpdateOn: 'blur',
        Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
        DisplayProperty: 'Name',
        ValueProperty: 'Value'
    }
];


