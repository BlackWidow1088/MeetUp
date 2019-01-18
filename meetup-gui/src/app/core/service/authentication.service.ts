import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/store/service/store.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { ApplicationState } from 'src/app/application-store/model';
import { ApiBaseService } from 'src/app/core/service/api-base.service';
import * as addSeconds from 'date-fns/add_seconds';
import * as isBefore from 'date-fns/is_before';
import * as format from 'date-fns/format';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { URLLinks } from '../model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // TODO: store in store service
  constructor(private storeService: StoreService,
    private apiBaseService: ApiBaseService, private router: Router) {
  }
  login(email: string, password: string) {
    return this.apiBaseService.post(URLLinks.login, { email, password })
    .pipe(
      map(res => {
        this.setSession(res);
        return res;
      }),
      shareReplay()
    );
  }

  private setSession(authResult) {
    const expiresAt = addSeconds(Date.now(), authResult.expiresIn);
    localStorage.setItem('expires_in', authResult.expiresIn);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout(routeQueryParams) {
    // TODO: logout from server
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/app/login'], routeQueryParams);
  }

  public isLoggedIn() {
    if (localStorage.getItem("id_token")) {
      return isBefore(new Date(), this.getExpiration());
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return format(expiresAt);
  }

}
