import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { of, map, catchError, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  emailPattern = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
  usernamePattern = /^[A-Za-z][A-Za-z0-9_]{4,30}$/;
  private validatorsUrl = environment.apiUrl + 'validators/';
  private http = inject(HttpClient);
  validateMatchFunction(matchWithControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const matchWithControl = control.parent?.get(matchWithControlName)
      if(!control || !matchWithControl || !control.value || !matchWithControl.value) {
        return null;
      }
      return control.value === matchWithControl.value ? null : {notMatched: true};
    }
  }
  validateClearSibling(clearControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      control.parent?.get(clearControlName)?.setValue('');
      return  null;
    }
  }

  validatePassword(): ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {
      if(!control || !control.value) {
        return null;
      }
      const reg: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        return reg.test(control.value) ? null : {password: true}
    }
  }

  validateUserEmailAsync(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      return this.http.get<boolean>(this.validatorsUrl + 'user/email?value=' + control.value).pipe(
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }
  validateUserNameAsync(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      return this.http.get<boolean>(this.validatorsUrl + 'user/username?value=' + control.value).pipe(
        delay(5000),
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }

  validateProductNameAsync(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      return this.http.get<boolean>(this.validatorsUrl + 'product/name?value=' + control.value).pipe(
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }
  validateProductCodeAsync(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      return this.http.get<boolean>(this.validatorsUrl + 'product/code?value=' + control.value).pipe(
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }
}
