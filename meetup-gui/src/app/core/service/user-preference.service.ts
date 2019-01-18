
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiBaseService } from 'src/app/core/service/api-base.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

interface UserPreferenceComponent {
  componentPreference: string;
  isNew?: boolean
  /*
    We need to handle the api for 2 purposes, first when fresh preferences are received and secondly
    when we set preferences for a particular component.
    thus, isNew flag is meant to serve the first purpose
    or else second case is chosen by default
  */
}
@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  keepAfterNavigationChange: boolean = false;
  private subject = new Subject<any>();
  private userPreferenceSource: Subject<UserPreferenceComponent> = new Subject();
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiBaseService: ApiBaseService
  ) { }

  getUserPreference() {
    // TODO: get user id from data store
    const userId = '123';
    return this.apiBaseService
      .get(`system/settings/${userId}`).pipe(
        map((res) => {
          this.preferences = JSON.parse(res);
          this.userPreferenceSource.next({ componentPreference: null, isNew: true })
          return res;
        }));
  }

  set preferences(prefer) {
    localStorage.setItem('preferences', JSON.stringify(prefer));
  }

  get preferences() {
    return localStorage.getItem('preferences');
  }

  saveUserPreference(obj) {
    // TODO: get user id from data store
    const userId = '123';
    try {
      return this.apiBaseService.put(
        `/settings/${userId}`,
        JSON.stringify(obj)
      ).pipe(map(response => {
        this.preferences = obj;
        return response;
      }));
    } catch (error) {
      // TODO: log error
    }
  }

  // handle error will handle errors occured during http fetch call
  handleError(error: any) {
    const errorMsg = error.message || 'Getting error';
    return errorMsg;
  }

  setUserpreferenceObj(obj: object, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next(obj);
  }

  getUserpreferenceObj(): Observable<any> {
    return this.subject.asObservable();
  }

  setComponentPreferences(componentName: string, data) {
    const userId = '123';
    const existingData = JSON.parse(this.preferences);
    const existingPreferenceData = existingData ? existingData : {};
    existingPreferenceData[componentName] = data;
    this.apiBaseService.put(
      `/settings/${userId}`,
      JSON.stringify(existingPreferenceData)
    ).subscribe(res => {
      this.preferences = existingPreferenceData;
      this.userPreferenceSource.next({ componentPreference: componentName });
    }, error => {
      console.log('put error');
      console.log(error);
      this.userPreferenceSource.next(null);
    });
  }

  getComponentPreferences(componentName: string) {
    let componentPreferencesSource;
    let userPreference;
    this.userPreferenceSource.subscribe((data: UserPreferenceComponent) => {
      userPreference = JSON.parse(this.preferences);
      if (data && userPreference) {
        if (!data.isNew || data.componentPreference === componentName) {
          componentPreferencesSource.next(userPreference[componentName])
        }
      }
    })
    userPreference = JSON.parse(this.preferences);
    componentPreferencesSource = new BehaviorSubject(userPreference ? userPreference[componentName] : null);
    return componentPreferencesSource.asObservable();
  }
}
