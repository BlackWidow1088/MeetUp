import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { LoggerService } from 'src/app/core/service/logger.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private logger: LoggerService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (!this.authenticationService.isLoggedIn()) {
      this.authenticationService.logout({
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }
}
