/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonErrorService } from './common-error.service';

describe('Service: CommonError', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonErrorService]
    });
  });

  it('should ...', inject([CommonErrorService], (service: CommonErrorService) => {
    expect(service).toBeTruthy();
  }));
});
