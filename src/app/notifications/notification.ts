import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface CampaignFilter {
    label?: string;
    type: 'text' | 'number' | 'date' | 'select' | 'bool';
    data?: any[];
    controlName: string;
    isMultiple?: boolean;
    valueAccessor?: string;
    displayAccessor?: string;
}
export interface MultiCastBindingModel {
    UserIds: string[];
    Title: string;
    Body: string;
    ImageUrl: string | null;
    Data: { [key: string]: string; } | null;
    Save: boolean | null;
}

export interface NotificationHistoryFilterModel extends GeneralFilterModel {
    dateFrom: string | null;
    dateTo: string | null;
    isReceived: boolean | null;
    isRead: boolean | null;
}
export interface NotificationHistoryListViewModel {
    userNotificationId: number;
    messageGuid: string | null;
    title: string | null;
    body: string | null;
    userId: string | null;
    mobileNumber: string | null;
    isReceieved: boolean;
    isRead: boolean;
    enableNotifications: boolean;
    haveToken: boolean;
    sender: string | null;
}