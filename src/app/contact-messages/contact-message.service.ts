import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';
import { ContactMessageFilterModel } from './contact-message';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  private http = inject(HttpClient);
  private url = environment.apiUrl + 'contactmessages';
  private loadingList = new BehaviorSubject<boolean>(false);
  get loadingList$(): Observable<boolean> {
    return this.loadingList.asObservable();
  }
  private loadingListDownload = new BehaviorSubject<boolean>(false);
  get loadingListDownload$(): Observable<boolean> {
    return this.loadingListDownload.asObservable();
  }
  private loadingRow = new BehaviorSubject<number[]>([]);
  get loadingRow$(): Observable<number[]> {
    return this.loadingRow.asObservable();
  }

  constructor() { }
  // createRedeemForm(): FormGroup {
  //   let frm = new FormGroup({
  //     Count: new FormControl('', Validators.required),
  //     Value: new FormControl('', Validators.required),
  //     ValidityValue: new FormControl('', Validators.required),
  //     Note: new FormControl(''),
  //     JournalDescription: new FormControl(''),
  //   });
  //   return frm;
  // }
  getByFilter(filter: ContactMessageFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    )
  }
  exportByFilter(filter: ContactMessageFilterModel): Observable<any> {
    this.loadingListDownload.next(true);
    return this.http.post(this.url + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }
  readMessage(itemId: number, rowIndex: number): Observable<boolean> {
    this.loadingRow.next([...this.loadingRow.value, rowIndex]);
    return this.http.get<boolean>(this.url + `/read?contactMessageId=${itemId}`).pipe(
      finalize(() => {
        var i = this.loadingRow.value.indexOf(rowIndex);
        this.loadingRow.value.splice(i,1);
        this.loadingRow.next(this.loadingRow.value);
      })
    )
  }
  unReadMessage(itemId: number, rowIndex: number): Observable<boolean> {
    this.loadingRow.next([...this.loadingRow.value, rowIndex]);
    return this.http.get<boolean>(this.url + `/unread?contactMessageId=${itemId}`).pipe(
      finalize(() => {
        var i = this.loadingRow.value.indexOf(rowIndex);
        this.loadingRow.value.splice(i,1);
        this.loadingRow.next(this.loadingRow.value);
      })
    )
  }
}
