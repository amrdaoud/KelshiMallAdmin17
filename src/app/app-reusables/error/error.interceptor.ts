import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private errorService = inject(ErrorService);
  private router = inject(Router);
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
          if(error.status === 0) {
            this.errorService.open(error.status, 'Please check your connection!');
          }
          else if(error.status === 401 || error.status === 403) {
            //this.errorService.open(error.status, 'Your are not authorized to perform this action!');
            this.errorService.open(error.status, 'You are not authorized to perform this action!');
          }
          else if(error.status === 500) {
            this.errorService.open(error.status, 'Something went wrong please report the error to developers!');
          }
          else if(error && error.error && error.error.message) {
            // const m = this.languageService.currentLanguage === 'ar' && error.error.messageArabic ? error.error.messageArabic : error.error.message;
            const m = error.error.message;
            this.errorService.open(error.status, m);
          } else if(error && error.message) {
            this.errorService.open(error.status, error.message);
          } else {
            this.errorService.open(error.status, JSON.stringify(error));
          }
        throw error;

      })
    )
  }
}
