import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';

import * as d3ContextMenu from 'd3-context-menu';
import * as d3Select from 'd3-selection';

import { D3Service } from 'src/app/main-layout/system-diagram/services/d3Service.service';
import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { ToolOptions, ToolTypeStr } from 'src/app/main-layout/system-diagram/toolbar/toolbar.types';
import { SystemDiagramOptions } from 'src/app/main-layout/system-diagram/system-diagram.component';

@Component({
  selector: 'app-system-diagram-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  @ViewChild('fpComponentCount') fpComponentCount: ElementRef;
  @Input() systemDiagramOptions: SystemDiagramOptions;

  toolSidebarOptions = ToolOptions;
  isShowLegend: boolean;
  showSubMenu: string = '';
  zoomValue: any = {
    scale: 100,
    k: 1,
    x: 0,
    y: 0
  };
  filterComponents: any;
  toolTypeStr = ToolTypeStr;
  lastIndex: number = 0;

  constructor(
    private d3Service: D3Service,
    private systemDiagramDataService: SystemDiagramDataService
  ) { }

  ngOnInit() {
    this.toolSidebarOptions.map(key => key.isHidden = this.systemDiagramOptions.tools.includes(key.type));
    this.isShowLegend = this.systemDiagramOptions.tools.includes(ToolTypeStr.legend);
    this.hideSubMenu();
    this.d3Service.subscribeZoom().subscribe(response => {
      response.scale = (response.k === 1) ? this.zoomValue.scale : Math.floor(response.k * 100);
      this.zoomValue = response;
    });
    this.systemDiagramDataService.subscribeComponents().subscribe(response => {
      if (this.fpComponentCount) {
        this.fpComponentCount.nativeElement.classList.add('animated');
      }
      this.filterComponents = response;

      setTimeout(() => {
        if (this.fpComponentCount) {
          this.fpComponentCount.nativeElement.classList.remove('animated')
        }
      }, 1000);
    });
  }

  resetSubMenu = (index, type): void => {
    this.showSubMenu = type;
    this.toolSidebarOptions[index].enabled = !this.toolSidebarOptions[index].enabled;
    this.toolSidebarOptions[index].open = !this.toolSidebarOptions[index].open;

    if (index !== this.lastIndex) {
      this.toolSidebarOptions[this.lastIndex].open = false;
      this.toolSidebarOptions[this.lastIndex].enabled = false;
      this.toolSidebarOptions[index].open = true;
      this.lastIndex = index;
    }
  }

  hideSubMenu = (): void => {
    // @@TODO we need to get rid of d3 dependency.
    d3Select.select(`body`).on(`click`, () => {
      if (!d3Select.event.target.closest(`.d3-context-menu`)) {
        d3ContextMenu('close');
      }
      if (
        !d3Select.event.target.closest(`#fpSubmenuWrapper`)
      ) {
        this.showSubMenu = '';
        this.toolSidebarOptions.map((key, i) => {
          key.open = false;
          if (i === this.lastIndex) {
            key.enabled = false;
          }
        });
      }
    });
  }

  onClickTool = (toolType, index, event?): void => {
    switch (toolType.type) {
      case ToolTypeStr.reset: {
        this.toolSidebarOptions[index].enabled = false;
        this.systemDiagramDataService.resetDiagram();
        break;
      };
      case ToolTypeStr.legend: {
        this.toolSidebarOptions[index].enabled = !this.toolSidebarOptions[index].enabled;
        this.isShowLegend = !this.isShowLegend;
        this.systemDiagramDataService.setLegends(this.isShowLegend);
        break;
      }
      case ToolTypeStr.save: {
        this.toolSidebarOptions[index].enabled = true;
        this.systemDiagramDataService.saveDiagram(this.zoomValue).subscribe(res => {
          this.toolSidebarOptions[index].enabled = false;
        });
        break;
      }
      case ToolTypeStr.filter: {
        event.stopPropagation();
        this.resetSubMenu(index, ToolTypeStr.filter);
        break;
      }
      case ToolTypeStr.export: {
        event.stopPropagation();
        this.resetSubMenu(index, ToolTypeStr.export);
        break;
      }
      case ToolTypeStr.recycle: {
        event.stopPropagation();
        this.resetSubMenu(index, ToolTypeStr.recycle);
        break;
      }
      default: break;
    }
  }
}
