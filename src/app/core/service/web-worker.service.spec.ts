/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebWorkerService } from './web-worker.service';

describe('Service: WebWorker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebWorkerService]
    });
  });

  it('should ...', inject([WebWorkerService], (service: WebWorkerService) => {
    expect(service).toBeTruthy();
  }));
});
