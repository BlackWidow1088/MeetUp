import { async, TestBed } from '@angular/core/testing';

import { VmInfrastructureRenderer, TypeVsOccurences } from 'src/app/main-layout/system-diagram/renderer/vm-infrastructure-renderer';
import { GridLayoutService } from 'src/app/main-layout/system-diagram/services/grid-layout.service';
import { GridLayoutServiceStub, infraStub } from 'src/app/main-layout/system-diagram/stubs';

describe('vmInfraStructure Renderer', () => {
  let vmInfrastructureRenderer: VmInfrastructureRenderer;
  let gridLayout;
  let nodes;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GridLayoutService, useValue: GridLayoutServiceStub }
      ]
    }).compileComponents();
    gridLayout = TestBed.get(GridLayoutService);
    spyOn(gridLayout, 'buildComponentTypeMap').and.returnValues(
      {
        "VM": [{}],
        "vSwitch": [{}, {}],
        "vmnic": [{}, {}, {}, {}],
        "vmknic": [{}, {}, {}, {}, {}],
        "portgroup": [{}, {}],
        "NAS Datastore": [{}, {}]
      },
      {
        "service_profile": [{}]
      },
      {
        "volume": [{}, {}]
      });
    vmInfrastructureRenderer = new VmInfrastructureRenderer(gridLayout);
    nodes = [...infraStub.nodes];
  }));

  it('should update service profile node width, height attribute based on children available', () => {
    const serviceProfileNode = nodes.filter(node => node.group === `server_logical_box`)[0];
    serviceProfileNode.width = 0;
    serviceProfileNode.height = 0;

    vmInfrastructureRenderer.updateServiceProfileNode(serviceProfileNode);
    expect(serviceProfileNode.width).toEqual(195);
    expect(serviceProfileNode.height).toEqual(730);
  })

  it('should return minimum offset', () => {
    expect(vmInfrastructureRenderer.findOffset(10, 20, false)).toEqual(10);
  })

  it('should return maximum offset', () => {
    expect(vmInfrastructureRenderer.findOffset(10, 20)).toEqual(20);
  })

  it('should find out unique group names from given nodes array', () => {
    const parent = vmInfrastructureRenderer.populateUniqueVmParents(nodes);
    expect(parent.length).toEqual(3);
    expect(parent.includes('host_logical_box')).toBeTruthy();
    expect(parent.includes('server_logical_box')).toBeTruthy();
    expect(parent.includes('svm_logical_box')).toBeTruthy();
  });

  it('should plot all nodes based on their group, also add service profile as a node', () => {
    vmInfrastructureRenderer.plotVmInfra(nodes);
    expect(nodes.filter(node => node.group === `server_logical_box`)[0].children.length).toEqual(5);
  });

  it('should add fake node for groups that does not have any node inside nodes', () => {
    const data = {
      groups: [{
        type: 'server_logical_box'
      }],
      nodes: []
    }
    vmInfrastructureRenderer.handleGroups(data);
    expect(data.nodes[0]).toEqual({
      group: 'server_logical_box',
      typeKey: 'server logical box',
      label: 'server logical box',
      subTypeKey: 'server logical box',
      visibility: 'hidden'
    })
  });

  it('should define starting x coordinate', () => {
    const xValue = (window.innerWidth / 2) - 685;
    const startX = xValue < 200 ? 200 : xValue;
    expect(vmInfrastructureRenderer.startX(nodes)).toEqual(startX);
  });

  it('should find number of nodes present for each group', () => {
    const typeVsOcc = {} as TypeVsOccurences;
    typeVsOcc["host_logical_box"] = 5;
    typeVsOcc["server_logical_box"]= 1;
    typeVsOcc["svm_logical_box"]= 2;
    expect(vmInfrastructureRenderer.getTypeVsOccurences(nodes)).toEqual(typeVsOcc);
  });
});
