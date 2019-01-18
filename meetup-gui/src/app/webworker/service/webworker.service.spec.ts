/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebworkerService } from './webworker.service';

describe('Service: Webworker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebworkerService]
    });
  });

  it('should ...', inject([WebworkerService], (service: WebworkerService) => {
    expect(service).toBeTruthy();
  }));
});
