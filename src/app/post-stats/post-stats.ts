import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";
export interface PostStatsFilterModel extends GeneralFilterModel {
    PostId?: number;
    StatType?: string;
}
export interface PostStatListViewModel {
    postStatsId: number;
    postId: number | null;
    postTitle: string | null;
    statTypeName: string | null;
    statType: string | null;
    statValue: string | null;
    date: Date;
    userId: string | null;
    userName: string | null;
    storeTitle: string | null;
    mobileNumber: string | null;
    description: string | null;
}