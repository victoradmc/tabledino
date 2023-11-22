import { AuthService } from 'src/app/services/auth.service';
import {inject} from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if ( authService.isLoggedIn ) {
    return true;
  }

  return router.parseUrl('/login');
  
};
