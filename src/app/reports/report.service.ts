import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MembershipExpiryReportFilterModel, PostExpiryReportFilterModel, PostServiceExpiryReportFilterModel } from './report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private http = inject(HttpClient);
  private reportsUrl = environment.apiUrl + 'reports'
  private loadingMembershipExpiryReport = new BehaviorSubject<boolean>(false);
  get loadingMembershipExpiryReport$(): Observable<boolean> {
    return this.loadingMembershipExpiryReport.asObservable();
  }
  private downloadingMembershipExpiryReport = new BehaviorSubject<boolean>(false);
  get downloadingMembershipExpiryReport$(): Observable<boolean> {
    return this.downloadingMembershipExpiryReport.asObservable();
  }

  private loadingPostServiceExpiryReport = new BehaviorSubject<boolean>(false);
  get loadingPostServiceExpiryReport$(): Observable<boolean> {
    return this.loadingPostServiceExpiryReport.asObservable();
  }
  private downloadingPostServiceExpiryReport = new BehaviorSubject<boolean>(false);
  get downloadingPostServiceExpiryReport$(): Observable<boolean> {
    return this.downloadingPostServiceExpiryReport.asObservable();
  }

  private loadingPostExpiryReport = new BehaviorSubject<boolean>(false);
  get loadingPostExpiryReport$(): Observable<boolean> {
    return this.loadingPostExpiryReport.asObservable();
  }
  private downloadingPostExpiryReport = new BehaviorSubject<boolean>(false);
  get downloadingPostExpiryReport$(): Observable<boolean> {
    return this.downloadingPostExpiryReport.asObservable();
  }

  getMembershipExpiryReport(filter: MembershipExpiryReportFilterModel): Observable<DataWithSize> {
    this.loadingMembershipExpiryReport.next(true);
    return this.http.post<DataWithSize>(this.reportsUrl + '/membershipExpiry/filter', filter).pipe(
      finalize(() => this.loadingMembershipExpiryReport.next(false))
    )
  }
  exportMembershipExpiryReport(filter: MembershipExpiryReportFilterModel): Observable<any> {
    this.downloadingMembershipExpiryReport.next(true);
    return this.http.post(this.reportsUrl + '/membershipExpiry/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.downloadingMembershipExpiryReport.next(false))
    )
  }

  getPostServiceExpiryReport(filter: PostServiceExpiryReportFilterModel): Observable<DataWithSize> {
    this.loadingPostServiceExpiryReport.next(true);
    return this.http.post<DataWithSize>(this.reportsUrl + '/postServiceExpiry/filter', filter).pipe(
      finalize(() => this.loadingPostServiceExpiryReport.next(false))
    )
  }
  exportPostServiceExpiryReport(filter: PostServiceExpiryReportFilterModel): Observable<any> {
    this.downloadingPostServiceExpiryReport.next(true);
    return this.http.post(this.reportsUrl + '/postServiceExpiry/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.downloadingPostServiceExpiryReport.next(false))
    )
  }

  getPostExpiryReport(filter: PostExpiryReportFilterModel): Observable<DataWithSize> {
    this.loadingPostExpiryReport.next(true);
    return this.http.post<DataWithSize>(this.reportsUrl + '/postExpiry/filter', filter).pipe(
      finalize(() => this.loadingPostExpiryReport.next(false))
    )
  }
  exportPostExpiryReport(filter: PostExpiryReportFilterModel): Observable<any> {
    this.downloadingPostExpiryReport.next(true);
    return this.http.post(this.reportsUrl + '/postExpiry/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.downloadingPostExpiryReport.next(false))
    )
  }

}
