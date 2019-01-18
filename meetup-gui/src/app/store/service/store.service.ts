import { Injectable, Optional } from '@angular/core';
import { StoreServiceConfig } from './store-service-config';
import { ActionReducer, Container, Action } from './../model';
import { Observable, Subject, of, merge } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _state: any = {};
  private _containers: Container<any>[] = [];
  private _observers: any = {};
  constructor(@Optional() private storeServiceConfig: StoreServiceConfig) {
    if (this.storeServiceConfig) {
      this._state = this.storeServiceConfig.initialState ? {...this.storeServiceConfig.initialState} : {};
      this._containers = this.storeServiceConfig.containers ? this.storeServiceConfig.containers : [];
      this._containers.forEach(item => {
        this._observers[item.name] = new Subject();
      });
    }
  }

  select(containerNames: string[]) {
      return merge(...containerNames.map(item => this._observers[item]));
  }

  dispatch(action: Action) {
    let stateChanged = false;
    let containerName;
      this._containers.forEach((item, index, array) => {
        if (item.actions && item.actions.includes(action.type) && typeof(item.reducer) === 'function') {
          this._state = item.reducer(this._state, action);
          stateChanged = true;
          containerName = item.name;
          return;
        }
      });
    if (stateChanged) {
      this._observers[containerName].next({...this._state});
    }
  }
}
