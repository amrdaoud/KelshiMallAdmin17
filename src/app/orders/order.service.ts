import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { OrderFilterModel, OrderStatusModel, OrderViewModel } from './order';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'orders';

  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$():Observable<boolean> {
    return this.loadingList.asObservable();
  }
  private loadingListDownload = new BehaviorSubject<boolean>(false);
  get loadingListDownload$():Observable<boolean> {
    return this.loadingListDownload.asObservable();
  }
  private loadingOrder = new BehaviorSubject<boolean>(false);
  get loadingOrder$():Observable<boolean> {
    return this.loadingOrder.asObservable();
  }
  private loadingStatuses = new BehaviorSubject<boolean>(false);
  get loadingStatuses$(): Observable<boolean> {
    return this.loadingStatuses.asObservable();
  }
  private changingStatus = new BehaviorSubject<boolean>(false);
  get changingStatus$(): Observable<boolean> {
    return this.changingStatus.asObservable();
  }
  constructor() { }
  getStatuses(pending?: boolean): Observable<OrderStatusModel[]> {
    this.loadingStatuses.next(true);
    let params = new HttpParams();
    if(pending !== undefined) params = params.set("pending", pending);
    return this.http.get<OrderStatusModel[]>(this.url + '/statuses', {params: params}).pipe(
      finalize(() => this.loadingStatuses.next(false))
    )
  }
  getOrdersByFilter(filter: OrderFilterModel, pending?: boolean, success?:boolean): Observable<DataWithSize> {
    this.loadingList.next(true);
    let params = new HttpParams();
    if(pending !== undefined) params = params.set("pending", pending);
    if(success !== undefined) params = params.set("success", success);
    return this.http.post<DataWithSize>(this.url + `/filter`, filter, {params: params}).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportOrderByFilter(filter: OrderFilterModel, pending?: boolean, success?:boolean): Observable<any> {
    this.loadingListDownload.next(true);
    let params = new HttpParams();
    if(pending !== undefined) params = params.set("pending", pending);
    if(success !== undefined) params = params.set("success", success);
    return this.http.post(this.url + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob', params:params}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }
  getOrderById(id: number): Observable<OrderViewModel> {
    this.loadingOrder.next(true);
    return this.http.get<OrderViewModel>(this.url + `?id=${id}`).pipe(
      finalize(() => this.loadingOrder.next(false))
    )
  }
  getOrdersByProviderFilter(providerId: number, filter: OrderFilterModel, pending?: boolean, success?:boolean): Observable<DataWithSize> {
    this.loadingList.next(true);
    let params = new HttpParams().set('providerId', providerId);
    if(pending !== undefined) params = params.set("pending", pending);
    if(success !== undefined) params = params.set("success", success);
    return this.http.post<DataWithSize>(this.url + `/byprovider`, filter, {params: params}).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportOrderByProviderFilter(providerId: number, filter: OrderFilterModel, pending?: boolean, success?:boolean): Observable<any> {
    this.loadingListDownload.next(true);
    let params = new HttpParams().set('providerId', providerId);
    if(pending !== undefined) params = params.set("pending", pending);
    if(success !== undefined) params = params.set("success", success);
    return this.http.post(this.url + `/byprovider/export?providerId=${providerId}`, filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob', params: params}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }
  acceptOrder(orderId: number): Observable<OrderViewModel> {
    this.changingStatus.next(true);
    return this.http.get<OrderViewModel>(this.url + `/accept?id=${orderId}`).pipe(
      finalize(() => this.changingStatus.next(false))
    );
  }
  rejectOrder(orderId: number, reason: string): Observable<OrderViewModel> {
    this.changingStatus.next(true);
    return this.http.get<OrderViewModel>(this.url + `/reject?id=${orderId}&reason=${reason}`).pipe(
      finalize(() => this.changingStatus.next(false))
    );
  }
  changeStatus(orderId: number, statusId: number, reason?: string): Observable<OrderViewModel> {
    this.changingStatus.next(true);
    return this.http.get<OrderViewModel>(this.url + `/changestatus?id=${orderId}&reason=${reason}&statusId=${statusId}`).pipe(
      finalize(() => this.changingStatus.next(false))
    );
  }
}
