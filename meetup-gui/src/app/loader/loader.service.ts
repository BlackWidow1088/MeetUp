import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderState } from './loader-state';

@Injectable()
export class LoaderService {
  private static loadingRequests: number = 0;
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }

  show() {
    LoaderService.loadingRequests++;
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide() {
    LoaderService.loadingRequests--;
    if (LoaderService.loadingRequests <= 0) {
      LoaderService.loadingRequests = 0;
      this.loaderSubject.next(<LoaderState>{ show: false });
    }
  }

}
