import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";


export interface OrderFilterModel extends GeneralFilterModel {
    providerId: number | null;
    statusIds: number[] | null;
    cities: string[] | null;
    orderId: number | null;
}

export interface OrderListViewModel {
    orderId: number;
    orderDate: string;
    lastActionDate: string | null;
    postId: number;
    postName: string | null;
    sellerUserId: string | null;
    sellerStoreTitle: string | null;
    sellerRecepientName: string | null;
    sellerRecepientMobileNumber: string | null;
    direction: string | null;
    distanceM: number;
    buyerUserId: string | null;
    buyerStoreTitle: string | null;
    buyerRecepientName: string | null;
    buyerRecepientMobileNumber: string | null;
    providerName: string | null;
    methodName: string | null;
    statusName: string | null;
    postPrice: number | null;
    deliveryFee: number | null;
    taxesFee: number | null;
    totalPrice: number | null;
    isFreeDelivery: boolean;
}

export interface OrderViewModel {
    orderId: number;
    orderDate: string;
    lastActionDate: string | null;
    postId: number;
    postName: string | null;
    postImage: string | null;
    sellerUserId: string | null;
    sellerStoreTitle: string | null;
    sellerRecepientName: string | null;
    sellerRecepientMobileNumber: string | null;
    sellerLon: number;
    sellerLat: number;
    direction: string | null;
    distanceM: number;
    buyerUserId: string | null;
    buyerStoreTitle: string | null;
    buyerRecepientName: string | null;
    buyerRecepientMobileNumber: string | null;
    buyerLon: number;
    buyerLat: number;
    providerName: string | null;
    methodName: string | null;
    statusName: string | null;
    postPrice: number | null;
    deliveryFee: number | null;
    taxesFee: number | null;
    totalPrice: number | null;
    canAccept: boolean;
    canReject: boolean;
    acceptName: string | null;
    rejectName: string | null;
    isFreeDelivery: boolean;
    buyerAddressNote: string | null;
    sellerAddressNote: string | null;
    sellerNote: string | null;
    statusHistory: OrderStatusHistoryModel[];
    statusId: number;
}

export interface OrderStatusModel {
    orderStatusId: number;
    orderStatusName: string;
    isPending: boolean,
    isSuccess: boolean
}

export interface OrderStatusHistoryModel {
    orderStatusId: number;
    orderStatusName: string | null;
    statusDate: string | null;
    iconClass: string | null;
    isDone: boolean;
    actionBy: string | null;
}