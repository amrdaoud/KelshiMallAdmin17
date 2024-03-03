import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export interface TransactionFilterModel {
    SearchQuery?: string;
    Reference?: string;
    UserId?: string;
    PageIndex: number;
    PageSize: number;
    SortActive: string;
    SortDirection: string;
    DateFrom?: Date;
    DateTo?: Date;
    Status?: string;
}
export interface TransactionListViewModel {
    transactionId: number;
    creditAccountNumber: string;
    debitAccountNumber: string;
    creditAccountName: string;
    debitAccountName: string;
    folio: number;
    userId: string;
    storeName: string;
    reference: string;
    description: string;
    transactionDate: Date;
    journalDate: Date;
    amount: number;
    operationType: string;
    isValidRevision: boolean;
    status: string;
    isCanceled: boolean;
    attachmentUrl: string;
    statusReason: string;
}


export interface RedeemCodeFilterModel extends GeneralFilterModel {
    Status: string | null;
    DateFrom: string | null;
    DateTo: string | null;
    GeneratedBy: string | null;
    UsedBy: string | null;
}

export interface RedeemCodeListViewModel {
    redeemCode: string;
    validityValue: number;
    issuingDate: string;
    isActive: boolean;
    value: number;
    generatedBy: string;
    totalGenerated: number;
    totalAvailable: number;
    totalUsed: number;
    validFor: Date;
    status: string;
    note: string;
    journalDescription: string;
}

export interface RedeemCodeUsersModel {
    redeemCode: string;
    usedByName: string;
    usedByNumber: string;
    usedByStoreName: string;
    usedDate: Date;
}

export interface GenerateRedeemModel {
    Count: number;
    Value: number;
    ValidityValue: number;
    Note: string;
}