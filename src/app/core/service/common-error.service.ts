import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonErrorService {

  constructor(private router: Router) { }
  handleErrorResponse(errorRes): any {

    switch (errorRes.status) {
      case 401:
        this.router.navigate(['login']);
        break;
      case 404:
        errorRes['error'] = { 'message': 'The action could not be completed' };
        break;
      case 0:
        errorRes.error.message = 'Server is not reachable';
        break;
      case 500:
        errorRes.error.message = 'Server is not reachable';
        break;
      case 200:
      case 201:
      case 202:
      case 204:
        return of(errorRes);
      default:
        break;
    }


    return throwError(errorRes);
  }
}
