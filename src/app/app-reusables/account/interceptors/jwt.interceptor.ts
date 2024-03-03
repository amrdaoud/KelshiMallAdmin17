import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefreshTokenService } from '../services/refresh-token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private refreshTokenService: RefreshTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.isSecured(request)) {
      return next.handle(request);
    }
    return this.refreshTokenService.handleRequest(request, next);
  }
  private isSecured(request: HttpRequest<unknown>): boolean {
    return !(request.url.endsWith('login') || request.url.includes('refresh-token') || request.url.toLowerCase().includes('customer-bill'));
  }
}
