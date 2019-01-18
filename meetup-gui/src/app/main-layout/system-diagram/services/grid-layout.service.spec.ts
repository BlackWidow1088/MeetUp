import { TestBed, inject } from '@angular/core/testing';

import { GridLayoutService } from './grid-layout.service';
import { apple, infraStub } from 'src/app/main-layout/system-diagram/stubs';

describe('GridLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridLayoutService]
    });
  });

  it('should be created', inject([GridLayoutService], (service: GridLayoutService) => {
    expect(service).toBeTruthy();
  }));

  it('should position nodes', inject([GridLayoutService], (service: GridLayoutService) => {
    const dataNodes = apple;
    for (const node of dataNodes.nodes) {
      node['typeKey'] = node.type.toLowerCase();
      node['subTypeKey'] = node['sub-type'].toLowerCase();
    }
    service.initializeNodes(dataNodes);
    expect(dataNodes.nodes[0]['x']).toEqual((service.getInnerWidth() / 2) - (dataNodes.nodes[0]['width'] / 2));
    expect(dataNodes.nodes[0]['y']).toEqual(50);
  }));

  it('should set dimentions and x-coordinate & y-coordinate of group node', inject([GridLayoutService], (service: GridLayoutService) => {
    const stub = {...infraStub};
    service.positionGroups(stub);
    const hostBox = stub.groups.filter(node => node.type === `host_logical_box`)[0];
    expect(hostBox['x']).toEqual(140);
    expect(hostBox['y']).toEqual(90);
    expect(hostBox['width']).toEqual(995);
    expect(hostBox['height']).toEqual(770);
  }));

});
