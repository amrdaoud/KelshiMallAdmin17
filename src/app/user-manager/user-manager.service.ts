import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { SendSmsModel, UserFilterModel } from './user-manager';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'usermanager';
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

  private loadingSendSms = new BehaviorSubject<boolean>(false);
  get loadingSendSms$(): Observable<boolean> {
    return this.loadingSendSms.asObservable();
  }

  private loadingPolicyAcceptance = new BehaviorSubject<boolean>(false);
  get loadingPolicyAcceptance$(): Observable<boolean> {
    return this.loadingPolicyAcceptance.asObservable();
  }

  constructor() { }
  getUsersByFilter(filter: UserFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportUsersByFilter(filter: UserFilterModel): Observable<any> {
    this.loadingListDownload.next(true);
    return this.http.post(this.url + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }
  activateUser(userId: string, rowIndex: number): Observable<boolean> {
    this.loadingActivation.next([...this.loadingActivation.value, rowIndex]);
    return this.http.get<boolean>(this.url + `/activate?userId=${userId}`).pipe(
      finalize(() => {
        var i = this.loadingActivation.value.indexOf(rowIndex);
        this.loadingActivation.value.splice(i,1);
        this.loadingActivation.next(this.loadingActivation.value);
      })
    )
  }
  deactivateUser(userId: string, rowIndex: number): Observable<boolean> {
    this.loadingActivation.next([...this.loadingActivation.value, rowIndex]);
    return this.http.get<boolean>(this.url + `/deactivate?userId=${userId}`).pipe(
      finalize(() => {
        var i = this.loadingActivation.value.indexOf(rowIndex);
        this.loadingActivation.value.splice(i,1);
        this.loadingActivation.next(this.loadingActivation.value);
      })
    )
  }
  sendSms(model: SendSmsModel): Observable<{message: string}> {
    this.loadingSendSms.next(true);
    return this.http.post<{message: string}>(this.url + '/sendsms', model).pipe(
      finalize(() => this.loadingSendSms.next(false))
    )
  }
  policyRequest(): Observable<boolean> {
    this.loadingPolicyAcceptance.next(true);
    return this.http.get<boolean>(this.url + '/policyrequest').pipe(
      finalize(() => this.loadingPolicyAcceptance.next(false))
    )
  }
  
}
