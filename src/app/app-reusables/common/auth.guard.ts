import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { AccountService } from '../account/services/account.service';



export const authGuard: CanActivateFn = (route, state) => {
  if(!inject(AccountService).isAuthenticated()) {
    inject(Router).navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
  if(inject(AccountService).inRoles(['SuperUser'])) {
    return of(true);
  }
  if(!route.data['Roles'] || route.data['Roles'].length == 0) {
    return of(true);
  }
  const result = inject(AccountService).inRoles(route.data['Roles']);
  if(!result) {
    inject(Router).navigate(['/403'], {queryParams: {returnUrl: state.url}});
    return false;
  }
  return true;
};
