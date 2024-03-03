import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";



export interface MembershipHistoryFilterModel extends GeneralFilterModel {
    MembershipId?: number[] ;
    UserId?: string;
    Status?: string;
    SubscribedAfter?: string;
    ExpiredBefore?: string;
}

export interface MembershipHistoryListViewModel {
    userMembershipId: number;
    userId: string | null;
    membershipId: number;
    subscriptionDate: string;
    expiryDate: string;
    status: string | null;
    name: string | null;
    type: string | null;
    description: string | null;
    maxActiveAds: number | null;
    maxBanners: number | null;
    allowFollowing: boolean | null;
    allowServices: boolean | null;
    allowDedicatedLink: boolean | null;
    allowPrivatePage: boolean | null;
    allowStoreSearch: boolean | null;
    allowClassifications: boolean | null;
    allowPrivateLogo: boolean | null;
    allowSiteWideFeaturing: boolean | null;
    allowFreeDesign: boolean | null;
    allowPrivateAccountManagement: boolean | null;
    discountedPrice: number | null;
    nameAr: string | null;
    descriptionAr: string | null;
    postDays: number | null;
}

export interface Membership {
    membershipId: number;
    name: string;
    nameAr: string;
    type: string;
    value: number;
    description: string;
    descriptionAr: string;
    isActive: boolean;
    maxActiveAds: number;
    maxBanners: number;
    allowFollowing: boolean;
    allowServices: boolean;
    allowDedicatedLink: boolean;
    allowPrivatePage: boolean;
    allowStoreSearch: boolean;
    allowClassifications: boolean;
    allowPrivateLogo: boolean;
    allowSiteWideFeaturing: boolean;
    allowFreeDesign: boolean;
    allowPrivateAccountManagement: boolean;
    validity: number;
    validityUnit: string;
    isDefault: boolean;
    bgColor: string;
    fgColor: string;
    discountedPrice: number;
    currencyId: number;
    postDays: number;
}