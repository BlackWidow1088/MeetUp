import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { AspectService } from 'app/shared/services';
import { aspectServiceStub } from 'app/shared/stubs/service-stub';
import { Observable } from 'rxjs';
import { CiDropdownComponent } from 'app/core/main-layout/header/ci-dropdown/ci-dropdown.component';

const systemInfoList = [
  {
    'systemId': 'dba04d3d1ba14c0191f251f11ba8c4d2',
    'rdocId': null,
    'rdoc': null,
    'systemName': 'Auto_CI11',
    'systemLocation': 'Pune',
    'systemCompany': 'Testing Purpose',
    'systemRoute': '/csa/ci/collection/dba04d3d1ba14c0191f251f11ba8c4d2',
    'systemTree': {
      'tree': null,
      'breadcrumbRoute': {
        'systemName': 'Auto_CI11',
        'ci': '/csa/ci/collection/dba04d3d1ba14c0191f251f11ba8c4d2',
        'compute': null,
        'storage': null,
        'virtualization': null,
        'network': null,
        'chassis': null,
        'cluster': null
      }
    },
    'systemRuleList': null,
    'agentLastUpdated': '2018-08-08T06:45:52Z',
    'agentOnline': false,
    'suppressions': []
  }
];

class RouterStub {
  navigate = jasmine.createSpy('navigate');
  url = 'csa/ci';
  ne = new NavigationEnd(0, '/main/link1', '/main/link1');
  events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });

  navigateByUrl(url: string) {
    location.hash = url;
  }
};

describe('CiDropdownComponent', () => {
  let component: CiDropdownComponent;
  let fixture: ComponentFixture<CiDropdownComponent>;
  let routerService: RouterStub;

  const routerStub = new RouterStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiDropdownComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AspectService, useValue: aspectServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    routerService = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiDropdownComponent);
    component = fixture.componentInstance;
    component.systemInfoList = systemInfoList;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should call navigateTo ', () => {
    const route = 'csa/ci/storage/storagelanding/';
    const ciName = 'Test CI';

    expect(component.navigateTo(route, ciName)).toBeUndefined();
  });

  it('should call filteredSystemsList ', () => {
    const event = {
      target: {
        value: 'TestCI'
      }
    }
    expect(component.filterSystemsList(event)).toBeUndefined();
  });

  it('should call resetDropdownIfOpened ciQuery should be empty', () => {

    component.resetDropdownIfOpened('');
    expect(component.ciQuery).toEqual('');
  });
});
