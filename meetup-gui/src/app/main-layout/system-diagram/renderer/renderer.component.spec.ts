import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import * as d3Select from 'd3-selection';
import { Observable } from 'rxjs';

import { buildTooltipHtmlString, getMsg, getValue, hideTooltip } from 'src/app/main-layout/system-diagram/decorator/tooltip';
import { decorateNodeWithChild } from 'src/app/main-layout/system-diagram/renderer/children';
import { RendererComponent } from 'src/app/main-layout/system-diagram/renderer/renderer.component';
import { D3Service } from 'src/app/main-layout/system-diagram/services/d3Service.service';
import { GridLayoutService } from 'src/app/main-layout/system-diagram/services/grid-layout.service';
import {
  DiagramCategory, SystemDiagramDataService,
} from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { GridLayoutServiceStub, invar, SystemDiagramDataServiceStub } from 'src/app/main-layout/system-diagram/stubs';
import { SystemErrorComponent } from 'src/app/main-layout/system-diagram/system-error/system-error.component';
import { ToolbarComponent } from 'src/app/main-layout/system-diagram/toolbar/toolbar.component';
import { ToolTypeStr } from 'src/app/main-layout/system-diagram/toolbar/toolbar.types';
import { LegendsComponent } from 'src/app/main-layout/system-diagram/toolbar/tools/legends/legends.component';
import { getMemoryUnit } from 'src/app/shared/common/shared-functions';
import { IPSLoggerService } from 'src/app/shared/services';
import { ipsloggerServiceStub } from 'src/app/shared/stubs/service-stub';

class RouterStub {
  navigate = jasmine.createSpy('navigate');
  url = '/main-layout/compute/computelanding/b9ed02edcfa74771b34d2c83ba0e3fbc/d0c569a057c54ca48a1daf1ef6d2e9b5';
  ne = new NavigationEnd(0, '/main/link1', '/main/link1');
  events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });

  navigateByUrl(url: string) {
    location.hash = url;
  }
};

const NodeData = {
  name: 'aaron5k-a',
  'sub-type': 'svm_logical_box',
  group: 'group',
  model_number: 'N9K-C9372PX-E',
  serial_number: 'N9K-C9372PX-E',
  label: 'Node',
  type: 'node',
  id: 1,
  count: 10,
  uptime: '10',
  state: 'active',
  total_available_ports: 1000,
  total_ports: 100000,
  mtu: '',
  mac_address: '',
  speed: 199,
  vlan_id: null,
  is_vmotion_portgroup: null,
  is_nfs_portgroup: null,
  is_iscsi_portgroup: null,
  portgroup_type: 'vMotion',
  size: 200,
  size_available: 200,
  size_used: 100,
  software_version: '',
  source: {
    label: 'aaron5k-a'
  },
  target: {
    label: 'aaron5k-a'
  },
  messages: {
    pass: [],
    fail: [],
    warning: []
  }
};

const IsSystemDiagramType = DiagramCategory.systemDiagram;
const VirtualDiagramType = DiagramCategory.virtualDiagram;

const header = `<p class='header'>${NodeData.label} (${NodeData.type})</p>`;

describe('RendererComponent', () => {
  let component: RendererComponent;
  let fixture: ComponentFixture<RendererComponent>;
  let routerService: RouterStub;

  const routerStub = new RouterStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RendererComponent, LegendsComponent, ToolbarComponent, SystemErrorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        D3Service,
        { provide: Router, useValue: routerStub },
        { provide: GridLayoutService, useValue: GridLayoutServiceStub },
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub },
        { provide: IPSLoggerService, useValue: ipsloggerServiceStub }
      ],
      imports: [RouterTestingModule],
    })
      .compileComponents();
    routerService = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendererComponent);
    component = fixture.componentInstance;
    component.data = invar;
    component.systemDiagramOptions = {
      tools: [ToolTypeStr.filter, ToolTypeStr.reset, ToolTypeStr.recycle, ToolTypeStr.save, ToolTypeStr.export, ToolTypeStr.legend],
      isDraggable: true,
      hasDiagramType: DiagramCategory.systemDiagram,
      hasLabel: false
    };
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update tooltip html', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'abcd';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${header}${getValue(`Software version`, node.software_version)}${getValue(`Model number`, node.model_number)}${getValue(`Serial number`, node.serial_number)}`
    );
  });

  it('should call GetValue and return valid string', () => {
    const htmlString = `<p class='content'>Name: Aaron</p>`;
    expect(getValue('Name', 'Aaron')).toEqual(htmlString);
  });

  it('should call GetMsg and return valid string', () => {
    const htmlString = `<p class='content'>Name: 0</p>`;
    expect(getMsg('Name', NodeData.messages.pass)).toEqual(htmlString);
  });

  it('should call buildTooltipHtmlString and return valid string Sfor svm_logical_box', () => {
    expect(buildTooltipHtmlString(NodeData, VirtualDiagramType)).toEqual(
      `${header}${getValue('SVM Name', NodeData.label)}${getValue('Operational Status', NodeData.state)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for volume', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'volume';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${header}${getValue(`SVM Name`, node.label)}${getValue(`Operational Status`, node.state)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for server_logical_box', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'Blade Server';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${header}${getValue(`Server Name`, node.label)}${getValue(`Model number`, node.model_number)}${getValue(`Serial Number`, node.serial_number)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for host_logical_box', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'ESXi';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${header}${getValue(`Host Name`, node.label)}${getValue(`Model number`, node.model_number)}${getValue(`Uptime`, node.uptime)}${getValue(`State`, node.state)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for VM', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'VM';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${header}${getValue(`VM (count)`, node.count)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for vSwitch', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'vSwitch';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${header}${getValue(`Name`, node.label)}${getValue(`MTU`, node.mtu)}${getValue(`Total Ports`, node.total_ports)}${getValue(`Total Available Ports`, node.total_available_ports)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for vmnic', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'vmnic';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      // tslint:disable-next-line
      `${header}${getValue(`Name`, node.label)}${getValue(`Mac Address`, node.mac_address)}${getValue(`Speed`, `${node.speed} Mbps`)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for vmknic', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'vmknic';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${header}${getValue(`Name`, node.label)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for portgroup', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'portgroup';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      // tslint:disable-next-line
      `${header}${getValue(`Name`, node.label)}${getValue(`Vlan Id`, node.vlan_id)}${getValue(`Is Vmotion Portgroup`, node.is_vmotion_portgroup)}${getValue(`Is NFS Portgroup`, node.is_nfs_portgroup)}${getValue(`Is ISCSI Portgroup`, node.is_iscsi_portgroup)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for Nas Datastore', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'NAS Datastore';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      // tslint:disable-next-line
      `${header}${getValue(`Name`, node.label)}${getValue(`Type`, node.type)}${getValue(`Free/ Available size`, getMemoryUnit(node.size))}${getValue(`Total Size`, getMemoryUnit(node.size_available))}${getValue(`Used Size`, getMemoryUnit(node.size_used))}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for empty string', () => {
    const node = { ...NodeData };
    node['sub-type'] = '';
    node.group = 'abcd';
    expect(buildTooltipHtmlString(node, IsSystemDiagramType)).toEqual(
      `${header}${getValue(`Software version`, node.software_version)}${getValue(`Model number`, node.model_number)}${getValue(`Serial number`, node.serial_number)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for no label and has source & target', () => {
    const node = { ...NodeData };
    node['sub-type'] = '';
    node.group = '';
    node.label = '';
    expect(buildTooltipHtmlString(node, VirtualDiagramType)).toEqual(
      `${getValue(`Source`, node.source.label)}${getValue(`Target`, node.target.label)}`
    );
  });

  it('should call buildTooltipHtmlString and return valid string for no label, no source & no target', () => {
    const node = { ...NodeData };
    node['sub-type'] = 'abcd';
    node.group = '';
    node.label = '';
    node.source = null;
    node.target = null;
    expect(buildTooltipHtmlString(node, IsSystemDiagramType)).toEqual(
      `${getMsg(`Pass`, node.messages.pass)}${getMsg(`Fail`, node.messages.fail)}${getMsg(`Warning`, node.messages.warning)}`
    );
  });

  it('should check for rulesCount function and return 4', () => {
    const node = { messages: { fail: [1, 2, 3, 4] } };
    expect(component.decorateNodeWithErrorContent.rulesCount(node)).toEqual(`4`);
  });

  it('should check for rulesCount function and return empty string', () => {
    const node = {
      messages: {
        fail: []
      }
    };
    expect(component.decorateNodeWithErrorContent.rulesCount(node)).toEqual(``);
  });

  it('should check for setTextPosition function and return empty string', () => {
    const node = {
      width: 100
    };
    expect(component.decorateNodeWithErrorContent.setTextPosition(node)).toBeGreaterThanOrEqual(45);
  });

  it('should check for returnId function ', () => {
    const node = {
      typeKey: 'compute'
    };
    expect(component.decorateNodeWithErrorContent.returnId(node)).toEqual(`app-failed-compute`);
  });

  it('should call handleNavigation function and expect route navigate to have been called', () => {
    const node = {
      typeKey: 'compute',
      label: 'Compute-A'
    };
    component.decorateNodeWithErrorContent.handleNavigation(node);
    expect(routerService.navigate).toHaveBeenCalledWith(
      ['/main-layout/compute/computelanding/b9ed02edcfa74771b34d2c83ba0e3fbc/d0c569a057c54ca48a1daf1ef6d2e9b5'], {
        queryParams: {
          ruleResult: 'Fail',
          deviceName: 'Compute-A'
        }
      }
    );
  });

  it('should call hideTooltip and expect it to be hidden', () => {
    const tooltipDiv = d3Select.select('body')
      .append('div')
      .attr('id', 'tooltip-div');
    hideTooltip(tooltipDiv);
    expect(tooltipDiv.style('opacity')).toEqual('0');
    d3Select.select(`#tooltip-div`).node().remove();
  });

  it('should call decorateNodeWithChild and plot children if children exists and return undefined', () => {
    const svgNode = d3Select.select('body')
      .append('div')
      .attr('id', 'graphSvgNode');
    svgNode
      .append('div')
      .attr('id', 'app-zoom-slider');
    svgNode.append('svg')
      .attr('height', '500')
      .attr('width', '500')
      .append('g')
      .attr('id', 'g-transform')
      .attr('transform', 'translate(10, 10)');
    const tooltipDiv = d3Select.select('body')
      .append('div')
      .attr('id', 'tooltip-div');

    invar.nodes[4].childrens.forEach(key => key['x'] = 100);
    expect(decorateNodeWithChild(svgNode, invar.nodes[4], tooltipDiv, VirtualDiagramType)).toBeUndefined();
    d3Select.select(`#graphSvgNode`).node().remove();
    d3Select.select(`#tooltip-div`).node().remove();
  });

  it('should call drawSystemDiagram and check if zoomSVG and zoomLevel are equal', () => {
    component.systemDiagramOptions = {
      tools: [ToolTypeStr.filter, ToolTypeStr.reset, ToolTypeStr.recycle, ToolTypeStr.save, ToolTypeStr.export, ToolTypeStr.legend],
      isDraggable: true,
      hasDiagramType: DiagramCategory.systemDiagram,
      hasLabel: true
    };
    component.drawSystemDiagram();
    expect(component.zoomSVG['k']).toEqual(1);
  });

  it('should call calculateScale k to be 100', () => {
    expect(component.calculateScale(1)).toEqual('100%');
    expect(component.calculateScale(2)).toEqual('200%');
  });

  it('should call getNodeVisibility to be true', () => {
    expect(component.getNodeVisibility({ visibility: true })).toBeTruthy();
  });

  it('should call getNodeVisibility to be visible', () => {
    expect(component.getNodeVisibility({ visibility: false })).toEqual('visible');
  });

  it('should call getLinkVisibility to be visible', () => {
    expect(component.getNodeVisibility({ visibility: 'visible' })).toEqual('visible');
  });

});
