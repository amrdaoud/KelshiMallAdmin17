import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { Membership, MembershipHistoryFilterModel } from './membership';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'membership';

  private loading = new BehaviorSubject<boolean>(false);
  get loading$ (): Observable<boolean> {
    return this.loading.asObservable();
  }

  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$(): Observable<boolean> {
    return this.loadingList.asObservable();
  }
  private loadingListDownload = new BehaviorSubject<boolean>(false);
  get loadingListDownload$(): Observable<boolean> {
    return this.loadingListDownload.asObservable();
  }

  private loadingAddToUser = new BehaviorSubject<boolean>(false);
  get loadingAddToUser$(): Observable<boolean> {
    return this.loadingAddToUser.asObservable();
  }

  constructor() { }
  getMemberships(): Observable<Membership[]> {
    this.loading.next(true);
    return this.http.get<Membership[]>(this.url).pipe(
      finalize(() => this.loading.next(false))
    )
  }
  getMembershipHistoryByFilter(filter: MembershipHistoryFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/history/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportMembershipHistoryByFilter(filter: MembershipHistoryFilterModel): Observable<any> {
    this.loadingListDownload.next(true);
    return this.http.post(this.url + '/history/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }

  addMembershipToUser(userId: string, membershipId: number, months: number): Observable<boolean> {
    this.loadingAddToUser.next(true);
    return this.http.get<boolean>(this.url + `/addmembershiptouser?userId=${userId}&membershipId=${membershipId}&months=${months}`).pipe(
      finalize(() => this.loadingAddToUser.next(false))
    )
  }
}
