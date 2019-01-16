/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserPreferenceService } from './user-preference.service';

describe('Service: UserPreference', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPreferenceService]
    });
  });

  it('should ...', inject([UserPreferenceService], (service: UserPreferenceService) => {
    expect(service).toBeTruthy();
  }));
});
