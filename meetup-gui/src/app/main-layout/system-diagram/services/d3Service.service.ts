import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

/**
 * This service is responsible for d3 related functionalities
 */
@Injectable()
export class D3Service {
  private zoomLevel = new Subject<any>();

  constructor() { }

  zoom(zoomPercentage: any) {
    this.zoomLevel.next(zoomPercentage);
  }

  subscribeZoom(): Observable<any> {
    return this.zoomLevel.asObservable();
  }
}
