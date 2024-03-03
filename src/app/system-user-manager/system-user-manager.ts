import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface SystemUserFilterModel extends GeneralFilterModel {
    // UserId?: string;
    // CreatedAfter?: Date;
    // SeenAfter?: Date;
    // IsActive?: boolean;
    // MembershipIds?: number[];
}
export interface SystemUserListViewModel {
    systemUserId: string;
    username: string;
    fullName: string;
    isActive: boolean;
    creationDate: Date;
    is2FA: boolean;
    lastSeen: string;
    roles: string[];
    deliveryProviderIds: number[];
    deliveryProviderNames: string[];
    isDelivery: boolean;
}
export interface EditRolesModel {
    Id: string;
    Roles: string[];
}
export interface EditDeliveryProvidersModel {
    id: string | null;
    deliveryProviderIds: number[] | null;
}