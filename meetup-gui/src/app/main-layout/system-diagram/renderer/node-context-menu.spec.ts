import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NodeContextMenu } from 'src/app/main-layout/system-diagram/renderer/node-context-menu';
import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { DeviceRouteTypeStub, SystemDiagramDataServiceStub } from 'src/app/main-layout/system-diagram/stubs';

describe('nodeContextMenu', () => {
  let nodeContextMenu: NodeContextMenu;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NodeContextMenu,
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub }
      ]
    });
    nodeContextMenu = TestBed.get(NodeContextMenu);
  });

  it('should return storage device route', () => {
    const device = {
      label: 'Backup-01',
      type: 'Storage'
    }
    expect(nodeContextMenu.deviceDetailRouteURL(device, DeviceRouteTypeStub)).toEqual('csa/ci/storage/cluster/clusterlanding/eb2d30b7534b4bd4bf7412cecd8d62cc.00001.00200');
  });

  it('should return compute device route', () => {
    const device = {
      label: 'switch-B',
      type: 'Compute'
    }
    expect(nodeContextMenu.deviceDetailRouteURL(device, DeviceRouteTypeStub)).toEqual('csa/ci/compute/fabricinterconnect/eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00001');
  });


  it('should return chassis device route', () => {
    const device = {
      label: 'chassis-1',
      type: 'Compute'
    }
    expect(nodeContextMenu.deviceDetailRouteURL(device, DeviceRouteTypeStub)).toEqual('csa/ci/compute/chassis/chassislanding/eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00003');
  });

  it('should return network device route', () => {
    const device = {
      label: 'stack5-9k-1',
      type: 'Network'
    }
    expect(nodeContextMenu.deviceDetailRouteURL(device, DeviceRouteTypeStub)).toEqual('csa/ci/network/switch/eb2d30b7534b4bd4bf7412cecd8d62cc.00003.00001');
  });

});
