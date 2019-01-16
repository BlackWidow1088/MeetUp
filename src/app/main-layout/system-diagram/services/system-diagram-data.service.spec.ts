import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { SystemsService } from 'src/app/core/services';
import { apple, custardApple, filterStub, Orange, infraStub } from 'src/app/main-layout/system-diagram/stubs';
import { ApplicationMessageBoardService } from 'src/app/shared/application-message-board/application-message-board.service';
import { ApiBaseService, AspectService, IPSLoggerService, UserPreferenceService } from 'src/app/shared/services';
import { routerStub } from 'src/app/shared/stubs/constants-stub';
import { apiBaseStub, applicationMessageBoardServiceStub, aspectServiceStub, ipsloggerServiceStub, preference, systemsServiceStub } from 'src/app/shared/stubs/service-stub';
import { of } from 'rxjs';
import { SystemDiagramDataService } from './system-diagram-data.service';

const userPreferenceServiceStub = {
  preferences: JSON.stringify(preference),
  saveUserPreference: userPreferencesArray => of([]),
};

describe('SystemDiagramDataService', () => {
  let systemDiagramDataService: SystemDiagramDataService;
  const filterStubTemp = {
    'Devices': [
      { label: 'virtualization', checked: false },
      { label: 'compute', checked: true },
      { label: 'network', checked: true },
      { label: 'mds', checked: false },
      { label: 'nexus', checked: true },
      { label: 'storage', checked: true }
    ],
    'Connections': [
      { label: 'Ethernet', checked: false },
      { label: 'FC', checked: true },
      { label: 'FCoE', checked: false }
    ],
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SystemDiagramDataService,
        LoaderService,
        { provide: Router, useValue: routerStub },
        { provide: IPSLoggerService, useValue: ipsloggerServiceStub },
        { provide: UserPreferenceService, useValue: userPreferenceServiceStub },
        { provide: SystemsService, useValue: systemsServiceStub },
        { provide: ApiBaseService, useValue: apiBaseStub },
        { provide: AspectService, useValue: aspectServiceStub },
        { provide: ApplicationMessageBoardService, useValue: applicationMessageBoardServiceStub }
      ]
    });

    systemDiagramDataService = TestBed.get(SystemDiagramDataService);
    systemDiagramDataService.setData(apple);
  });

  it('should be created', inject([SystemDiagramDataService], (service: SystemDiagramDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should call set data and return undefined', () => {
    expect(systemDiagramDataService.setData(apple)).toBeUndefined();
  }
  );

  it('should call get data and check if its not null', () => {
    expect(systemDiagramDataService.getData()).not.toBeNull();
  });

  it('should call reset diagram and return undefined', () => {
    expect(systemDiagramDataService.resetDiagram()).toBeUndefined();
  });

  it('should call get applied filter and return undefined', () => {
    expect(systemDiagramDataService.getAppliedFilter()).toEqual({'Devices': [], 'Connections': []});
  });

  it('should call update component and expect response to be true', () => {
    expect(systemDiagramDataService.updateComponent({ id: 1 }));
    expect(systemDiagramDataService.componentList).toEqual([{ id: 1}]);
  });

  it('should call update component node and expect response to be true', () => {
    systemDiagramDataService.updateComponentsNode('all', { id: 1 })
    expect(systemDiagramDataService.componentList).toEqual([]);
  });

  it('should call update component node and expect response to be empty', () => {
    systemDiagramDataService.subscribeComponents().subscribe(response => {
      expect(response).toEqual('');
    });
  });

  it('should call mockAPICall and expect it to be equal to sample data', () => {
    systemDiagramDataService.systemDiagramAPICall();
    expect(systemDiagramDataService.componentList).toEqual([]);
  });

  it('should call filterProps with devices and expect it to be equal to uniqueKeys Set', () => {
    const uniqueKeys = new Set<String>(['storage', 'nexus', 'mds', 'network', 'compute', 'virtualization']);
    expect(systemDiagramDataService.filterProps(apple.nodes, 'type')).toEqual(uniqueKeys);
  });

  it('should call filterProps with connections and expect it to be equal to uniqueKeys Set', () => {
    const uniqueKeys = new Set<String>(['Ethernet', 'FCoE', 'FC']);
    expect(systemDiagramDataService.filterProps(apple.links, 'protocol')).toEqual(uniqueKeys);
  });

  it('should call resetFilter and expect it to be equal devices length', () => {
    const filters = systemDiagramDataService.resetFilter();
    expect(filters.Devices.length).toEqual(filterStub.Devices.length);
  });

  it('should call resetFilter and expect it to be equal connections length', () => {
    const filters = systemDiagramDataService.resetFilter();
    expect(filters.Connections.length).toEqual(filterStub.Connections.length);
  });

  it('should call toggleComponentVisibility, represent device visibility and expect it to be equal to sample data', () => {
    systemDiagramDataService.toggleComponentVisibility(custardApple.nodes, 'type', filterStubTemp['Devices']);
    expect(custardApple.nodes).toEqual(Orange.nodes);
  });

  it('should call toggleComponentVisibility, represent connections visibility and expect it to be equal to sample data', () => {
    systemDiagramDataService.toggleComponentVisibility(custardApple.links, 'protocol', filterStubTemp['Connections']);
    expect(custardApple.links).toEqual(Orange.links);
  });
  it('should preProcess data by modifying or adding fields', () => {
    const stub = {... infraStub };
    delete stub.nodes[0]['typeKey'];
    delete stub.nodes[0]['subTypeKey'];
    delete stub.nodes[0]['model_number'];
    systemDiagramDataService.initialize(stub)
    expect(stub).toEqual(infraStub);
  });
});
