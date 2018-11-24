/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiBaseService } from './api-base.service';

describe('Service: ApiBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBaseService]
    });
  });

  it('should ...', inject([ApiBaseService], (service: ApiBaseService) => {
    expect(service).toBeTruthy();
  }));
});
