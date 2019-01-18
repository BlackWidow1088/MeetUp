import { TestBed, inject } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
  });

  it('should be created', inject([LoaderService], (service: LoaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should show loader', inject([LoaderService], (service: LoaderService) => {
    service.show();
    expect(service.show).toBeTruthy();
  }));

  it('should hide loader', inject([LoaderService], (service: LoaderService) => {
    service.hide()
    expect(service.hide).toBeTruthy();
  }));
});
