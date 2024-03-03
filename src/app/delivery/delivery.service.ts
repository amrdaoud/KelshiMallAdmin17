import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeliveryFeeViewModel, DeliveryMethodModel, DeliveryProviderBindingModel, DeliveryProviderCoverageBindingModel, DeliveryProviderFeeBindingModel, DeliveryProviderFilterModel, DeliveryProviderViewModel } from './delivery';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { convertJsontoFormData } from '../app-reusables/helpers';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  
  createProviderForm(provider?: DeliveryProviderViewModel): FormGroup {
    let frm = new FormGroup({
      deliveryProviderId: new FormControl(provider?.deliveryProviderId ?? 0),
      address: new FormControl(provider?.address),
      logoFile: new FormControl(null),
      mobileNumber: new FormControl(provider?.mobileNumber, Validators.required),
      name: new FormControl(provider?.name, Validators.required),
      logoUrl: new FormControl(provider?.logo)
    });
    return frm;
  }
  createProviderFeesForm(provider: DeliveryProviderViewModel, allMethods: DeliveryMethodModel[]): FormGroup {
    let frm = new FormGroup({
      deliveryProviderId: new FormControl(provider?.deliveryProviderId ?? 0),
      deliveryMethodFees: new FormArray([])
    });
    allMethods.forEach(method => {
      (frm.get('deliveryMethodFees') as FormArray).push(new FormGroup({
        deliveryMethodId: new FormControl(method.deliveryMethodId),
        deliveryMethodName: new FormControl({value: method.nameAr, disabled: true}),
        costPerKm: new FormControl(provider.fees.find(x => x.deliveryMethodId === method.deliveryMethodId)?.costPerKm)
      }))
    })
    return frm;
  }

  private http = inject(HttpClient);
  private deliveryUrl = environment.apiUrl + 'delivery';

  private loadingProviders = new BehaviorSubject<boolean>(false);
  get loadingProviders$(): Observable<boolean> {
    return this.loadingProviders.asObservable();
  }
  private loadingOneProvider = new BehaviorSubject<boolean>(false);
  get loadingOneProvider$(): Observable<boolean> {
    return this.loadingOneProvider.asObservable();
  }
  private loadingMethods = new BehaviorSubject<boolean>(false);
  get loadingMethods$(): Observable<boolean> {
    return this.loadingMethods.asObservable();
  }
  
  private editingProviderMainInfo = new BehaviorSubject<boolean>(false);
  get editingProviderMainInfo$(): Observable<boolean> {
    return this.editingProviderMainInfo.asObservable();
  }
  private editingProviderCoverage = new BehaviorSubject<boolean>(false);
  get editingProviderCoverage$(): Observable<boolean> {
    return this.editingProviderCoverage.asObservable();
  }
  private editingProviderFees = new BehaviorSubject<boolean>(false);
  get editingProviderFees$(): Observable<boolean> {
    return this.editingProviderFees.asObservable();
  }
  private activatingProvider = new BehaviorSubject<boolean>(false);
  get activatingProvider$(): Observable<boolean> {
    return this.activatingProvider.asObservable();
  }

  constructor() { }

  getDeliveryProviders(filter: DeliveryProviderFilterModel): Observable<DataWithSize> {
    this.loadingProviders.next(true);
    return this.http.post<DataWithSize>(this.deliveryUrl + '/providers/filter', filter).pipe(
      finalize(() => this.loadingProviders.next(false))
    )
  }
  getDeliveryProviderById(id: number): Observable<DeliveryProviderViewModel> {
    this.loadingOneProvider.next(true);
    return this.http.get<DeliveryProviderViewModel>(this.deliveryUrl + `/providers?id=${id}`).pipe(
      finalize(() => this.loadingOneProvider.next(false))
    )
  }
  getDeliveryMethods(): Observable<DeliveryMethodModel[]> {
    this.loadingMethods.next(true);
    return this.http.get<DeliveryMethodModel[]>(this.deliveryUrl + '/methods').pipe(
      finalize(() => this.loadingMethods.next(false))
    )
  }
  addDeliveryProvider(model: DeliveryProviderBindingModel): Observable<DeliveryProviderViewModel> {
    this.editingProviderMainInfo.next(true);
    const frmData = convertJsontoFormData(model);
    return this.http.post<DeliveryProviderViewModel>(this.deliveryUrl + '/addProvider', frmData).pipe(
      finalize(() => this.editingProviderMainInfo.next(false))
    )
  }
  editDeliveryProviderMainInfo(model: DeliveryProviderBindingModel): Observable<any> {
    this.editingProviderMainInfo.next(true);
    const frmData = convertJsontoFormData(model);
    return this.http.post(this.deliveryUrl + '/editprovider', frmData).pipe(
      finalize(() => this.editingProviderMainInfo.next(false))
    )
  }
  editDeliveryProviderCoverage(model: DeliveryProviderCoverageBindingModel): Observable<any> {
    this.editingProviderCoverage.next(true);
    return this.http.post(this.deliveryUrl + '/editprovidercoverage', model).pipe(
      finalize(() => this.editingProviderCoverage.next(false))
    )
  }
  editDeliveryProviderFees(model: DeliveryProviderFeeBindingModel): Observable<any> {
    this.editingProviderFees.next(true);
    return this.http.post(this.deliveryUrl + '/editproviderFees', model).pipe(
      finalize(() => this.editingProviderFees.next(false))
    )
  }
  activateProvider(id: number): Observable<boolean> {
    this.activatingProvider.next(true);
    return this.http.get<boolean>(this.deliveryUrl + '/activateprovider?id=' + id).pipe(
      finalize(() => this.activatingProvider.next(false))
    )
  }
  deleteProvider(id: number): Observable<boolean> {
    this.activatingProvider.next(true);
    return this.http.get<boolean>(this.deliveryUrl + '/deleteprovider?id=' + id).pipe(
      finalize(() => this.activatingProvider.next(false))
    )
  }
  deactivateProvider(id: number): Observable<boolean> {
    this.activatingProvider.next(true);
    return this.http.get<boolean>(this.deliveryUrl + '/deactivateprovider?id=' + id).pipe(
      finalize(() => this.activatingProvider.next(false))
    )
  }
  
}
