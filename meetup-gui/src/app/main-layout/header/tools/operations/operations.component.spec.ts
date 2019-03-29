import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { SystemsService } from 'app/core/services';
import { IPSLoggerService, JobService } from 'app/shared/services';
import { ipsloggerServiceStub, jobServiceStub, systemsServiceStub } from 'app/shared/stubs/service-stub';
import { OperationsComponent } from './operations.component';

describe('OperationsComponent', () => {
  let component: OperationsComponent;
  let fixture: ComponentFixture<OperationsComponent>;
  let jobService: JobService;
  let systemsService: SystemsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsComponent ],
      providers: [
        { provide: JobService, useValue: jobServiceStub },
        { provide: IPSLoggerService, useValue: ipsloggerServiceStub },
        { provide: SystemsService, useValue: systemsServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsComponent);
    component = fixture.componentInstance;
    jobService = TestBed.get(JobService);
    systemsService = TestBed.get(SystemsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleJobNotification', () => {
    component.toggleJobNotification();
    expect(component.hasJobCountAcknowledgement).toBe(false);
  });

});
