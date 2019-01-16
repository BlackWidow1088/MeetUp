import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { filterStub, SystemDiagramDataServiceStub } from 'src/app/main-layout/system-diagram/stubs';
import { FilterComponent } from 'src/app/main-layout/system-diagram/toolbar/tools/filter/filter.component';
import { IPSLoggerService } from 'src/appshared/services';
import { ipsloggerServiceStub } from 'src/appshared/stubs/service-stub';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FilterComponent],
      providers: [
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub },
        { provide: IPSLoggerService, useValue: ipsloggerServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be apply filter and return undefined', () => {
    expect(component.applyFilter()).toBeUndefined();
  });

  it('should be call toggle all filter and return undefined', () => {
    expect(component.toggleAll()).toBeUndefined();
  });

  it('should be call checkIsSelectAll and isSelectAll to be true ', () => {
    component.appliedFilter = Object.assign({}, JSON.parse(JSON.stringify(filterStub)));
    component.hasSelectAll();
    expect(component.isSelectAll).toBeTruthy();
  });

  it('should be call checkIsSelectAll and isSelectAll to be false ', () => {
    component.appliedFilter = {
      'Devices': [
        { label: 'virtualization', checked: false }
      ],
      'Connections': [
        { label: 'Ethernet', checked: true }
      ],
    };
    component.hasSelectAll();
    expect(component.isSelectAll).toBeFalsy();
  });

});
