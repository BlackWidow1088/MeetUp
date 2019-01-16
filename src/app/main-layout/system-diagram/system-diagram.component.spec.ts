import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RendererComponent } from 'src/app/main-layout/system-diagram/renderer/renderer.component';
import { D3Service } from 'src/app/main-layout/system-diagram/services/d3Service.service';
import { GridLayoutService } from 'src/app/main-layout/system-diagram/services/grid-layout.service';
import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { SystemDiagramRoutingModule } from 'src/app/main-layout/system-diagram/system-diagram-routing.module';
import { SystemDiagramComponent } from 'src/app/main-layout/system-diagram/system-diagram.component';
import { SystemErrorComponent } from 'src/app/main-layout/system-diagram/system-error/system-error.component';
import { GridLayoutServiceStub, SystemDiagramDataServiceStub } from './stubs';

describe('SystemDiagramComponent', () => {
  let component: SystemDiagramComponent;
  let fixture: ComponentFixture<SystemDiagramComponent>;
  let systemDiagramDataService: SystemDiagramDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDiagramComponent, RendererComponent, SystemErrorComponent],
      imports: [
        CommonModule,
        SystemDiagramRoutingModule
      ],
      providers: [
        D3Service,
        // { provide: Router, useValue: routerStub },
        { provide: GridLayoutService, useValue: GridLayoutServiceStub },
        // { provide: IPSLoggerService, useValue: ipsloggerServiceStub },
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDiagramComponent);
    component = fixture.componentInstance;
    systemDiagramDataService = TestBed.get(SystemDiagramDataService);
    systemDiagramDataService.systemDiagramAPICall = jasmine.createSpy('systemDiagramAPICall');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should call after view init and check if systemDiagramAPICall has been called', () => {
    component.ngAfterViewInit();
    expect(systemDiagramDataService.systemDiagramAPICall).toHaveBeenCalled();
  });

});
