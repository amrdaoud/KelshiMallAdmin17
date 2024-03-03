import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { JwtInterceptor } from './app-reusables/account/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './app-reusables/error/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp } from "firebase/app";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
initializeApp(environment.firebase);
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimations(),
              importProvidersFrom(MatDialogModule),
              importProvidersFrom(HttpClientModule),
              importProvidersFrom(MatSnackBarModule),
              {provide: DEFAULT_CURRENCY_CODE, useValue: 'SYP'},
              {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
              {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}, provideAnimationsAsync()]
};
