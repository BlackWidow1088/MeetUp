import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import * as d3Select from 'd3-selection';

import { ExportAsComponent } from 'src/app/main-layout/system-diagram/toolbar/tools/exportAs/exportAs.component';

describe('ExportAsComponent', () => {
  let component: ExportAsComponent;
  let fixture: ComponentFixture<ExportAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExportAsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportAsComponent);
    component = fixture.componentInstance;
    const svg = d3Select.select('body')
      .append('div')
      .attr('id', 'graphSvg');
    svg
      .append('div')
      .attr('id', 'app-zoom-slider');
    svg.append('svg')
      .attr('height', '500')
      .attr('width', '500')
      .append('g')
      .attr('id', 'g-transform')
      .attr('transform', 'translate(10, 10)');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClickDownload with type png and check if active to be true for png', () => {
    const exportAs = {
      type: 'png',
      active: false
    };
    expect(component.onClickDownload(exportAs)).toBeUndefined();
    expect(component.exportTo[0].active).toBeTruthy();
    d3Select.select(`#graphSvg`).node().remove();
  });

  it('should call onClickDownload with type pdf and check if active to be true for pdf', () => {
    const exportAs = {
      type: 'pdf',
      active: false
    };
    expect(component.onClickDownload(exportAs)).toBeUndefined();
    expect(component.exportTo[1].active).toBeTruthy();
    d3Select.select(`#graphSvg`).node().remove();
  });

  it('should call onClickDownload with type pdf and return false', () => {
    const exportAs = {
      type: 'pdf',
      active: false
    };
    component.fileName = '';
    expect(component.onClickDownload(exportAs)).toBeFalsy();
  });

});
