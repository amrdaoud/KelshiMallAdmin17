import { Injectable } from '@angular/core';
import { AuthenticationModel } from '../models/account';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap, filter, first } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  isWaiting = false;
  refreshTokenSubject = new BehaviorSubject<AuthenticationModel | null>(null);
  constructor(private accountService: AccountService) { }
  handleRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.accountService.isTokenExpired()) {
      return next.handle(this.addTokenHeader(
        request, this.accountService.auth?.token
      ));
    }
    if(this.isWaiting) {
      return this.waitedRefreshToken().pipe(
        switchMap(x => {
          return next.handle(this.addTokenHeader(request, x?.token))
        })
      )
    }
    else {
      return this.currentRefreshToken().pipe(
        switchMap(x => {
          return next.handle(this.addTokenHeader(request, x?.token))
        })
      )
    }
  }
  currentRefreshToken(): Observable<AuthenticationModel | null> {
    this.isWaiting = true;
    this.refreshTokenSubject.next(null);
    return this.accountService.refreshToken().pipe(
      tap(x => {
        this.isWaiting = false;
        this.refreshTokenSubject.next(x);
      })
    )
  }
  waitedRefreshToken(): Observable<AuthenticationModel | null> {
    return this.refreshTokenSubject.pipe(
      filter(x => x !== null),
      first()
    )
  }
  addTokenHeader(request: HttpRequest<unknown>, token: string | undefined | null): HttpRequest<unknown> {
    const authReq = request.clone({headers: request.headers.append('Authorization', 'bearer '+ token)});
    return authReq;
  }
}
