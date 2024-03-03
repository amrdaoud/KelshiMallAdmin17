import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { MultiCastBindingModel, NotificationHistoryFilterModel } from './notification';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'Notifications';
  private loadingSendNotifications = new BehaviorSubject<boolean>(false);
  get loadingSendNotifications$(): Observable<boolean> {
    return this.loadingSendNotifications.asObservable();
  }
  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$(): Observable<boolean> {
    return this.loadingList.asObservable();
  }
  private loadingListDownload = new BehaviorSubject<boolean>(false);
  get loadingListDownload$(): Observable<boolean> {
    return this.loadingListDownload.asObservable();
  }
  constructor() { }
  sendMulticastNotifications(model: MultiCastBindingModel): Observable<number> {
    this.loadingSendNotifications.next(true)
    return this.http.post<number>(this.url + '/sendMultiCast', model).pipe(
      finalize(() => this.loadingSendNotifications.next(false))
    )
  }
  sendMulticastNotificationsAll(model: MultiCastBindingModel): Observable<number> {
    this.loadingSendNotifications.next(true)
    return this.http.post<number>(this.url + '/sendMultiCast/all', model).pipe(
      finalize(() => this.loadingSendNotifications.next(false))
    )
  }
  sendMulticastNotificationsExclude(model: MultiCastBindingModel): Observable<number> {
    this.loadingSendNotifications.next(true)
    return this.http.post<number>(this.url + '/sendMultiCast/exclude', model).pipe(
      finalize(() => this.loadingSendNotifications.next(false))
    )
  }
  getByFilter(filter: NotificationHistoryFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportByFilter(filter: NotificationHistoryFilterModel): Observable<any> {
    this.loadingListDownload.next(true);
    return this.http.post(this.url + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }
}
