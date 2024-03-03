import { GeneralFilterModel } from "../app-reusables/data-table/data-table.models";



export interface DeliveryProviderFilterModel extends GeneralFilterModel {

}

export interface DeliveryProviderListViewModel {
    deliveryProviderId: number;
    name: string | null;
    storeName: string | null;
    mobileNumber: string | null;
    address: string | null;
    logo: string | null;
    citiesText: string | null;
    feesText: string | null;
    totalOrders: number;
    totalDoneOrders: number;
    totalPendingOrders: number;
    isDeleted: boolean;
    isActive: boolean;
}

export interface DeliveryProviderViewModel {
    deliveryProviderId: number;
    name: string | null;
    storeName: string | null;
    mobileNumber: string | null;
    address: string | null;
    logo: string | null;
    isDeleted: boolean;
    coverages: DeliveryProviderCoverageViewModel[];
    fees: DeliveryFeeViewModel[];
    isActive: boolean;
}

export interface DeliveryProviderBindingModel {
    deliveryProviderId: number;
    name: string | null;
    storeName: string | null;
    mobileNumber: string | null;
    address: string | null;
    logoFile: any | null;
}

export interface DeliveryProviderCoverageViewModel {
    city: string | null;
    areas: string[];
}

export interface DeliveryFeeViewModel {
    deliveryMethodId: number;
    nameAr: string | null;
    nameEn: string | null;
    descriptionAr: string | null;
    descriptionEn: string | null;
    deliveryMethodLogo: string | null;
    costPerKm: number;
}

export interface DeliveryProviderCoverageBindingModel {
    deliveryProviderId: number;
    cityArea: CityAreaBindingModel[];
}

export interface DeliveryProviderFeeBindingModel {
    deliveryProviderId: number;
    deliveryMethodFees: DeliveryFeeBindingModel[];
}

export interface CityAreaBindingModel {
    city: string | null;
    area: string | null;
}

export interface DeliveryFeeBindingModel {
    deliveryMethodId: number;
    costPerKm: number;
}

export interface DeliveryMethodModel {
    deliveryMethodId: number;
    nameAr: string | null;
    nameEn: string | null;
    descriptionAr: string | null;
    descriptionEn: string | null;
    logo: string | null;
}