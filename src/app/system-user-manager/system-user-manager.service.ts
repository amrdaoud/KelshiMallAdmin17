import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { ValidatorsService } from '../app-reusables/validators/validators.service';
import { EditDeliveryProvidersModel, EditRolesModel, SystemUserFilterModel, SystemUserListViewModel } from './system-user-manager';
import { ChangePasswordModel, RegisterModel } from '../app-reusables/account/models/account';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';

@Injectable({
  providedIn: 'root'
})
export class SystemUserManagerService {
  private http = inject(HttpClient);
  private validatorsService = inject(ValidatorsService);
  private url = environment.apiUrl + 'systemusermanager';

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
  private loadingChnageRoles = new BehaviorSubject<number[]>([]);
  get loadingChnageRoles$(): Observable<number[]> {
    return this.loadingChnageRoles.asObservable();
  }
  private loadingChangePassword = new BehaviorSubject<boolean>(false);
  get loadingChangePassword$(): Observable<boolean> {
    return this.loadingChangePassword.asObservable();
  }
  private loadingRoles = new BehaviorSubject<boolean>(false);
  get loadingRoles$(): Observable<boolean> {
    return this.loadingRoles.asObservable();
  }
  private loadingRegister = new BehaviorSubject<boolean>(false);
  get loadingRegister$(): Observable<boolean> {
    return this.loadingRegister.asObservable();
  }
  constructor() { }
  createChangePasswordForm(userId: string): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(userId, Validators.required),
      NewPassword: new FormControl('', [Validators.required, this.validatorsService.validatePassword, this.validatorsService.validateClearSibling('PasswordConfirm') ]),
      PasswordConfirm: new FormControl('', [Validators.required, this.validatorsService.validateMatchFunction('NewPassword')])
    })
    return frm;
  }
  createRegisterForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      FullName: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, this.validatorsService.validatePassword, this.validatorsService.validateClearSibling("PasswordConfirm")]),
      PasswordConfirm: new FormControl('', [Validators.required, this.validatorsService.validateMatchFunction("Password")]),
      Roles: new FormControl([], [Validators.required])
    });
    return frm;
  }
  getUsersByFilter(filter: SystemUserFilterModel): Observable<DataWithSize> {
    this.loadingList.next(true);
    return this.http.post<DataWithSize>(this.url + '/filter', filter).pipe(
      finalize(() => this.loadingList.next(false))
    );
  }
  exportUsersByFilter(filter: SystemUserFilterModel): Observable<any> {
    this.loadingListDownload.next(true);
    return this.http.post(this.url + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.loadingListDownload.next(false))
    )
  }
  getRoles(): Observable<string[]> {
    this.loadingRoles.next(true);
    return this.http.get<string[]>(this.url + '/roles').pipe(
      finalize(() => this.loadingRoles.next(false))
    );
  }
  register(model: RegisterModel): Observable<SystemUserListViewModel> {
    this.loadingRegister.next(true);
    return this.http.post<SystemUserListViewModel>(this.url + '/register', model).pipe(
      finalize(() => this.loadingRegister.next(false))
    );
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
  changePassword(model: ChangePasswordModel, rowIndex: number): Observable<boolean> {
    this.loadingChangePassword.next(true);
    return this.http.post<boolean>(this.url + `/changepassword`, model).pipe(
      finalize(() => {
        this.loadingChangePassword.next(false);
      })
    )
  }
  editRoles(model: EditRolesModel, rowIndex: number): Observable<boolean> {
    this.loadingActivation.next([...this.loadingActivation.value, rowIndex]);
    return this.http.post<boolean>(this.url + `/editRoles`, model).pipe(
      finalize(() => {
        var i = this.loadingActivation.value.indexOf(rowIndex);
        this.loadingActivation.value.splice(i,1);
        this.loadingActivation.next(this.loadingActivation.value);
      })
    )
  }
  editDeliveryProviders(model: EditDeliveryProvidersModel, rowIndex: number): Observable<boolean> {
    this.loadingActivation.next([...this.loadingActivation.value, rowIndex]);
    return this.http.post<boolean>(this.url + `/editDeliveryProviders`, model).pipe(
      finalize(() => {
        var i = this.loadingActivation.value.indexOf(rowIndex);
        this.loadingActivation.value.splice(i,1);
        this.loadingActivation.next(this.loadingActivation.value);
      })
    )
  }


}
