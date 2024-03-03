import { Languages } from "../app-models/generic";

export interface UserFilterModel {
    SearchQuery?: string;
    UserId?: string;
    PageIndex: number;
    PageSize: number;
    SortActive: string;
    SortDirection: string;
    CreatedAfter?: Date;
    SeenAfter?: Date;
    IsActive?: boolean;
    MembershipIds?: number[];
}
export interface UserListViewModel {
    userId: string;
    userName: string;
    mobileNumber: string;
    creationDate: Date;
    lastModified: Date;
    isActive: boolean;
    lastSeen: Date;
    area: string;
    city: string;
    whatsAppNumber: string;
    totalPosts: number;
    totalActivePosts: number;
    walletBalance: number;
    totalPurshaces: number;
    storeName: string;
    membershipName: string;
    membershipEndDate: Date;
    profilePicture: string;
    backgroundPictures: string[];
    storeId: number;
}
export interface SendSmsModel {
    MobileNumbers: string[];
    Body: string;
    Language: Languages;
}