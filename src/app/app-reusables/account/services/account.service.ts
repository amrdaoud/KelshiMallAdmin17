import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../validators/validators.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { AuthenticationModel, ChangePasswordModel, LoginModel, RegisterModel } from '../models/account';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private validatorsService = inject(ValidatorsService);
  private accountUrl = environment.apiUrl + 'accounts/'
  private http = inject(HttpClient);
  private account = new BehaviorSubject<AuthenticationModel | null>(null);

  private loadingLogin = new BehaviorSubject<boolean>(false);
  get loadingLogin$(): Observable<boolean> {
    return this.loadingLogin.asObservable();
  }
  private loadingRegister = new BehaviorSubject<boolean>(false);
  get loadingRegister$(): Observable<boolean> {
    return this.loadingRegister.asObservable();
  }
  private loadingRegisterToken = new BehaviorSubject<boolean>(false);
  get loadingRegisterToken$(): Observable<boolean> {
    return this.loadingRegisterToken.asObservable();
  }
  constructor() {
    this.account.next(this.auth);
  }
  createRegisterForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      FullName: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, this.validatorsService.validatePassword, this.validatorsService.validateClearSibling("PasswordConfirm")]),
      PasswordConfirm: new FormControl('', [Validators.required, this.validatorsService.validateMatchFunction("Password")])
    });
    return frm;
  }
  createLoginForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });
    return frm;
  }
  createChangePasswordForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl(this.account.value?.userName, Validators.required),
      Password: new FormControl('', Validators.required),
      NewPassword: new FormControl('', [Validators.required, this.validatorsService.validatePassword, this.validatorsService.validateClearSibling("PasswordConfirm")]),
      PasswordConfirm: new FormControl('', [Validators.required, this.validatorsService.validateMatchFunction("NewPassword")]),
    });
    return frm;
  }

  get auth(): AuthenticationModel | null {
    const authString = localStorage.getItem('auth');
    if(!authString) {
      return null;
    }
    const auth = JSON.parse(authString) as AuthenticationModel;
    return auth;
  }
  get account$(): Observable<AuthenticationModel | null>{
    return this.account.asObservable();
  }
  private storeAuth(model: AuthenticationModel) {
    model.tokenDate = Date.now();
    localStorage.setItem('auth', JSON.stringify(model))
  }
  getRoles(): string[] | null {
    const auth = this.auth;
    if(auth) {
      return auth.roles;
    }
    return [];
  }
  isAuthenticated(): boolean {
    return this.auth?.isAuthenticated ?? false;
  }
  inRoles(roles?: string[]): boolean {
    const auth = this.auth;
    if(auth) {
      return auth.roles?.includes('Super User') || auth.roles?.find(x => roles?.includes(x)) ? true : false;
    }
    return false;
  }
  logOut() {
    localStorage.removeItem('auth');
    this.account.next(null);
  }
  ///HTTP
  login(model: LoginModel): Observable<AuthenticationModel> {
    this.loadingLogin.next(true);
    return this.http.post<AuthenticationModel>(this.accountUrl + 'login', model).pipe(
      tap(x => { if(x) {x.tokenDurationM = 300; this.storeAuth(x); this.account.next(x); }}),
      finalize(() => this.loadingLogin.next(false))
    )
  }
  register(model: RegisterModel): Observable<boolean> {
    this.loadingRegister.next(true);
    return this.http.post<boolean>(this.accountUrl + 'register', model).pipe(
      finalize(() => this.loadingRegister.next(false))
    )
  }
  registerFcmToken(tokenId: string): Observable<boolean> {
    this.loadingRegisterToken.next(true);
    return this.http.get<boolean>(this.accountUrl + `registertoken?tokenId=${tokenId}`).pipe(
      finalize(() => this.loadingRegisterToken.next(false))
    )
  }
  isTokenExpired(): boolean {
    //No Refresh Token
    // return false;
    return !this.auth || Date.now() - this.auth?.tokenDate > this.auth?.tokenDurationM * 60 * 1000;
  }
  refreshToken(): Observable<AuthenticationModel | null> {
    return this.http.post<AuthenticationModel>(this.accountUrl + 'refresh-token',{
      Token: this.auth?.refreshToken ?? ''
    })
    .pipe(
      tap(x => {
        this.account.next(x);
        this.storeAuth(x)
      })
    )
  }
  changePassword(model: ChangePasswordModel):Observable<AuthenticationModel> {
    this.loadingLogin.next(true);
    return this.http.post<AuthenticationModel>(this.accountUrl + 'changepassword', model).pipe(
      finalize(() => this.loadingLogin.next(false))
    )
  }
}
