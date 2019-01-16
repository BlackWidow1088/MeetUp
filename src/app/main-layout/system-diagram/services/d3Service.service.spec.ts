import { TestBed, inject } from '@angular/core/testing';

import { D3Service } from 'src/app/main-layout/system-diagram/services/d3Service.service';
import { GridLayoutService } from './grid-layout.service';

describe('d3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3Service, GridLayoutService]
    });
  });

  it('should be created', inject([D3Service], (service: D3Service) => {
    expect(service).toBeTruthy();
  }));

});
