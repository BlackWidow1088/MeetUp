import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CommonErrorService } from 'src/app/core/service/common-error.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  constructor(
    private http: HttpClient,
    private errorService: CommonErrorService,
    private authenticationService: AuthenticationService) { }

  private buildUrl(endPoint: string) {
    let apiURL = '';
    return apiURL.concat(endPoint);
  }

  private getHeaders = () => {
    let headers = new HttpHeaders();
    const authToken = this.authenticationService.getAuthToken();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + authToken);
    return headers;
  };


  private handleResponse(res: Response): any {
    if (res && res['error']) {
      throw new Error(res['error']);
    } else {
      return res;
    }
  }

  get(endPoint) {
    const url = this.buildUrl(endPoint);
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      }), catchError((error: Response) => {
        return this.errorService.handleErrorResponse(error);
      })
    );
  }

  put(endPoint: string, jsonData) {
    const url = this.buildUrl(endPoint);
    return this.http.put(url, jsonData, { headers: this.getHeaders() }).pipe(map((res: Response) => {
      return this.handleResponse(res);
    })).pipe(catchError((error: Response) => {
      return this.errorService.handleErrorResponse(error);
    }));
  }

  post(endPoint: string, jsonData = {}) {
    const url = this.buildUrl(endPoint);
    return this.http.post(url, jsonData, { headers: this.getHeaders() }).pipe(map((res: Response) => {
      return this.handleResponse(res);
    })).pipe(catchError((error: Response) => this.errorService.handleErrorResponse(error)));
  }

  delete(endPoint) {
    const url = this.buildUrl(endPoint);
    return this.http.delete(url, { headers: this.getHeaders() }).pipe(map((res: Response) => {
      return this.handleResponse(res);
    })).pipe(catchError((error: Response) => throwError(error)));
  }
}
