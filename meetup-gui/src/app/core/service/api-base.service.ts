import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CommonErrorService } from 'src/app/core/service/common-error.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StoreService } from 'src/app/store/service';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  constructor(
    private http: HttpClient,
    private errorService: CommonErrorService,
    private storeService: StoreService) {
    //  TODO: store service to store
  }

  private getHeaders = () => {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const authToken = localStorage.getItem('id_token');
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

  get(url) {
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      }), catchError((error: Response) => {
        return this.errorService.handleErrorResponse(error);
      })
    );
  }

  put(url: string, jsonData) {
    return this.http.put(url, jsonData, { headers: this.getHeaders() }).pipe(map((res: Response) => {
      return this.handleResponse(res);
    })).pipe(catchError((error: Response) => {
      return this.errorService.handleErrorResponse(error);
    }));
  }

  post(url: string, jsonData = {}) {
    return this.http.post(url, jsonData, { headers: this.getHeaders() }).pipe(map((res: Response) => {
      return this.handleResponse(res);
    })).pipe(catchError((error: Response) => this.errorService.handleErrorResponse(error)));
  }

  delete(url) {
    return this.http.delete(url, { headers: this.getHeaders() }).pipe(map((res: Response) => {
      return this.handleResponse(res);
    })).pipe(catchError((error: Response) => throwError(error)));
  }
}
