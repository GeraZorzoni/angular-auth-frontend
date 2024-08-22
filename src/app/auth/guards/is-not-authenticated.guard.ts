import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  //**usamos del servicio los estados de authservices */

  const authService = inject(AuthService)
  const router = inject( Router )

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/dasboard')
    return false;
  }
  return true;
};
