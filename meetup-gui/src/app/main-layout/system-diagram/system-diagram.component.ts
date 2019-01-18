import { AfterViewInit, Component, Input } from '@angular/core';

import {
  DiagramCategory, SystemDiagram, SystemDiagramDataService,
} from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { ToolTypeStr } from 'src/app/main-layout/system-diagram/toolbar/toolbar.types';

export interface SystemDiagramOptions {
  data?: SystemDiagram,
  tools?: string[],
  height?: number,
  initialZoomLevel?: number,
  isDraggable: boolean,
  hasDiagramType: DiagramCategory,
  hasLabel: boolean
}

@Component({
  selector: 'app-system-diagram',
  templateUrl: './system-diagram.component.html',
  styleUrls: ['./system-diagram.component.scss']
})
export class SystemDiagramComponent implements AfterViewInit {

  @Input() systemDiagramOptions: SystemDiagramOptions = {
    tools: [ToolTypeStr.filter, ToolTypeStr.reset, ToolTypeStr.recycle, ToolTypeStr.save, ToolTypeStr.export, ToolTypeStr.legend],
    isDraggable: true,
    initialZoomLevel: 0.9,
    height: 100,
    hasDiagramType: DiagramCategory.systemDiagram,
    hasLabel: false
  };

  constructor(
    private systemDiagramDataService: SystemDiagramDataService
  ) { }

  ngAfterViewInit() {
    this.systemDiagramOptions.data ? this.systemDiagramDataService.initialize(this.systemDiagramOptions.data) : this.systemDiagramDataService.systemDiagramAPICall();
  }
}
