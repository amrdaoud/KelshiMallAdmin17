import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";


export interface PaidServiceHistoryFilterModel extends GeneralFilterModel {
    UserId?: string;
    PostId?: number;
    PaidServiceId?: number;
    PaidServiceCode?: string;
    IsActive?: boolean;
    AddedAfter?: string;
    ExpiresBefore?: string;
}
export interface PaidServiceHistoryListViewModel {
    postPaidServiceId: number;
    postId: number;
    paidServiceId: number;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    servciceCode: string;
    price: number;
    currencyId: number;
    currencyName: string | null;
    postTitle: string | null;
    isActive: boolean;
    isDefault: boolean;
    date: string;
    hour: number | null;
    amount: number;
    validityUnit: string;
    validityValue: number;
    journalHeaderId: number;
}

export interface PaidService {
    paidServiceId: number;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    servciceCode: string;
    price: number;
    currencyId: number;
    validityUnit: string;
    validityValue: number;
    isActive: boolean;
    isDefault: boolean;
}