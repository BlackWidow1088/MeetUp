import { TestBed, async, inject } from '@angular/core/testing';
import { FilterList } from './unique-filter-list';
import { filterStub } from 'src/app/main-layout/system-diagram/stubs';


describe('Unique Filter List', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterList
      ]
    });
  });

  it('should initiate service', inject([FilterList], (service: FilterList) => {
    expect(service).toBeTruthy();
  }));

  it('should return connections array without duplicating values', inject([FilterList], (service: FilterList) => {
    expect(service.getFilteredList(filterStub['Connections'], 'Ethernet')).toEqual(filterStub['Connections']);
  }));

  it('should return devices array without duplicating values', inject([FilterList], (service: FilterList) => {
    expect(service.getFilteredList(filterStub['Devices'], 'storage')).toEqual(filterStub['Devices']);
  }));

  it('should return connections array with all checked as true -  reset condition', inject([FilterList], (service: FilterList) => {
    expect(service.getFilteredList(filterStub['Connections'], 'Ethernet')).toEqual(filterStub['Connections']);
  }));
});
