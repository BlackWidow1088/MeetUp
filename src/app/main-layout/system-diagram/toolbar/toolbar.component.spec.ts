import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { D3Service } from 'src/app/main-layout/system-diagram/services/d3Service.service';
import { GridLayoutService } from 'src/app/main-layout/system-diagram/services/grid-layout.service';
import { SystemDiagramDataService, DiagramCategory } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { GridLayoutServiceStub, SystemDiagramDataServiceStub } from 'src/app/main-layout/system-diagram/stubs';
import { ToolTypeStr } from 'src/app/main-layout/system-diagram/toolbar/toolbar.types';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        D3Service,
        { provide: GridLayoutService, useValue: GridLayoutServiceStub },
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    component.systemDiagramOptions = {
      tools: [ToolTypeStr.filter, ToolTypeStr.reset, ToolTypeStr.recycle, ToolTypeStr.save, ToolTypeStr.export, ToolTypeStr.legend],
      isDraggable: true,
      hasDiagramType: DiagramCategory.systemDiagram,
      hasLabel: false
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    component.zoomValue.k = 1;
    expect(component).toBeTruthy();
  });

  it('should reset diagram onClickTool', () => {
    component.onClickTool({ type: ToolTypeStr.reset }, 1);
    expect(component.toolSidebarOptions[1].enabled).toBeFalsy();
  });

  it('should show/hide diagram onClickTool', () => {
    expect(component.onClickTool({ type: ToolTypeStr.legend }, 0));
    expect(component.isShowLegend).toBeFalsy();
  });

  it('should filter onClickTool and check if event stopPropogation has been called', () => {
    const event = jasmine.createSpyObj('event', [ 'stopPropagation' ]);
    expect(component.onClickTool({ type: ToolTypeStr.filter }, 0, event));
    expect(event.stopPropagation).toHaveBeenCalled();
  });


  it('should click export onClickTool', () => {
    const event = jasmine.createSpyObj('event', [ 'stopPropagation' ]);
    expect(component.onClickTool({ type: ToolTypeStr.export }, 0, event));
    expect(event.stopPropagation).toHaveBeenCalled();
  });


  it('should click on recycle onClickTool', () => {
    const event = jasmine.createSpyObj('event', [ 'stopPropagation' ]);
    expect(component.onClickTool({ type: ToolTypeStr.recycle }, 0, event));
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should click save onClickTool and enabled to equal false', () => {
    component.onClickTool({ type: ToolTypeStr.save }, 0);
    expect(component.toolSidebarOptions[0].enabled).toEqual(false)
  });

  it('should default break onClickTool', () => {
    component.toolSidebarOptions.forEach(key => key.open = false);
    expect(component.onClickTool({ type: '' }, 0));
    expect(component.toolSidebarOptions[0].open).toBeFalsy();
    expect(component.toolSidebarOptions[1].open).toBeFalsy();
    expect(component.toolSidebarOptions[2].open).toBeFalsy();
    expect(component.toolSidebarOptions[3].open).toBeFalsy();
    expect(component.toolSidebarOptions[4].open).toBeFalsy();
  });
});
