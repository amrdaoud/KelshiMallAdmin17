import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaidService, PaidServiceHistoryFilterModel } from './paid-service';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';

@Injectable({
  providedIn: 'root'
})
export class PaidServiceService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'paidservices';
  private loadingPaidServices = new BehaviorSubject<boolean>(false);
  get loadingPaidServices$(): Observable<boolean> {
    return this.loadingPaidServices.asObservable();
  }
  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$(): Observable<boolean> {
    return this.loadingList.asObservable();
  }
  private loadingListDownload = new BehaviorSubject<boolean>(false);
  get loadingListDownload$(): Observable<boolean> {
    return this.loadingListDownload.asObservable();
  }
  private loadingActivation = new BehaviorSubject<number[]>([]);
  get loadingActivation$(): Observable<number[]> {
    return this.loadingActivation.asObservable();
  }
  constructor() { }
  getPaidServices():Observable<PaidService[]> {
    this.loadingPaidServices.next(true);
    return this.http.get<PaidService[]>(this.url).pipe(
      finalize(() => this.loadingPaidServices.next(false))
    )
  }
  getHistoryByFilter(filter: PaidServiceHistoryFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportHistoryByFilter(filter: PaidServiceHistoryFilterModel): Observable<any> {
    this.loadingListDownload.next(true);
    return this.http.post(this.url + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }
  deactivateService(serviceId: number, rowIndex: number): Observable<boolean> {
    this.loadingActivation.next([...this.loadingActivation.value, rowIndex]);
    return this.http.get<boolean>(this.url + '/deactivate?postPaidServiceId=' + serviceId).pipe(
      finalize(() => {
        var i = this.loadingActivation.value.indexOf(rowIndex);
        this.loadingActivation.value.splice(i,1);
        this.loadingActivation.next(this.loadingActivation.value);
      })
    )
  }
}
