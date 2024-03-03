import { InjectionToken, inject } from "@angular/core";
import { CampaignFilter } from "./notification";
import { GenericService } from "../app-services/generic.service";
import { ColumnDef, DataTableButtonObject, DataTableFilter, GeneralFilterModel } from "../app-reusables/data-table/data-table.models";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { of } from "rxjs";

export const campaignFilters: CampaignFilter[] = [
    {
        label: 'User Id',
        controlName: 'UserId',
        type: 'text'
    },
    {
        label: 'Have Categories',
        controlName: 'CategoryIds',
        type: 'select',
        data: [],
        valueAccessor: "value",
        displayAccessor: 'name'
    }
]

export const CAMPAIN_CONFIG = new InjectionToken('Campain Configuration', {
    factory: () => {
      return {
        campaignFilters: [
            {
                label: 'User Id',
                controlName: 'UserId',
                type: 'text'
            },
            {
                label: 'Have Categories',
                controlName: 'CategoryIds',
                type: 'select',
                data: inject(GenericService).categories$,
                valueAccessor: "value",
                displayAccessor: 'name'
            }
        ]
      }
    }
  });

  export const notificationHistoryConst :
{columns: ColumnDef[], initialFilter?: GeneralFilterModel, filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[], selectBtns?: DataTableButtonObject[]} = {
    columns: [
        {Name: "#", Property: "userNotificationId"},
        {Name: "Message#", Property: "messageGuid"},
        {Name: "Date", Property: "date", IsSort: true, Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a'},
        {Name: "Title", Property: "title", IsSort: true},
        {Name: "Body", Property: "body", IsSort: true},
        {Name: "Mobile", Property: "mobileNumber"},
        {Name: "Received?", Property: "isReceieved", IsSort: true, Highlights: [
            {Operation: '=', Value: true, Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)', AltText:"Yes"},
            {Operation: '=', Value: false, Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.3)', AltText: "No"},
        ]},
        {Name: "Read?", Property: "isRead", IsSort: true, Highlights: [
            {Operation: '=', Value: true, Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)', AltText:"Yes"},
            {Operation: '=', Value: false, Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.3)', AltText: "No"},
        ]},
        {Name: "Enabled?", Property: "enableNotifications", IsSort: true, Highlights: [
            {Operation: '=', Value: true, Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)', AltText:"Yes"},
            {Operation: '=', Value: false, Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.3)', AltText: "No"},
        ]},
        {Name: "Accepted?", Property: "haveToken", IsSort: true, Highlights: [
            {Operation: '=', Value: true, Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)', AltText:"Yes"},
            {Operation: '=', Value: false, Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.3)', AltText: "No"},
        ]},
        {Name: "Sender", Property: "sender", IsSort: true}
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
            ControlName: 'IsReceived',
            PlaceHolder: 'Received?',
            UpdateOn: 'blur',
            Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
            DisplayProperty: 'Name',
            ValueProperty: 'Value'
        },
        {
            Type: 'select',
            ControlName: 'IsRead',
            PlaceHolder: 'Read?',
            UpdateOn: 'blur',
            Data: of([{Value: true,Name: 'Yes'},{Value: false,Name:'No'}]),
            DisplayProperty: 'Name',
            ValueProperty: 'Value'
        }
    ],
    menuButtons: [],
}