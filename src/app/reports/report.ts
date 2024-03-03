import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";
import { PostListViewModel } from "../posts/post";
import { UserListViewModel } from "../user-manager/user-manager";

export interface MembershipExpiryReportFilterModel extends GeneralFilterModel {
    expiryInDays: number;
    memberShipIds?: number[];
}

export interface PostServiceExpiryReportFilterModel extends GeneralFilterModel {
    expiryInDays: number;
    postServiceType?: string;
}

export interface PostExpiryReportFilterModel extends GeneralFilterModel {
    expiryInDays: number;
}

export interface MembershipExpiryReportModel extends UserListViewModel {
    ExpiryInDays: number;
}

export interface PostExpiryReportModel extends PostListViewModel {
    ExpiryInDays: number;
}