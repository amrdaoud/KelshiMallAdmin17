import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface ContactMessageFilterModel extends GeneralFilterModel {
    UserId?: string;
    DateFrom?: string;
    DateTo?: string;
    Status?: string;
}

export interface ContactMessageListViewModel {
    contactMessageId: number;
    messageDate: Date;
    readDate: Date | null;
    mobileNumber: string | null;
    title: string | null;
    name: string | null;
    body: string | null;
    storeTitle: string | null;
    status: string;
    userId: string | null;
    systemUserId: string | null;
    userName: string | null;
    systemUserName: string | null;
    attachmentUrl: string | null;
    profilePicture: string | null
}