import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, NavigationEnd, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { BreadcrumbComponent } from './breadcrumb.component';

@Component({
  template: ''
})
class MockLoginComponent { }

const BreadCrumbRoutes = {
  systemName: 'test',
  ci: 'test',
  compute: 'test',
  storage: 'test',
  virtualization: 'test',
  network: 'test',
  chassis: 'test',
  hosts: 'test',
  virtualMachines: 'test',
  cluster: 'test'
}

class RouterStub {
  public navigate = jasmine.createSpy('navigate');
  public url = 'csa/ci';
  public ne = new NavigationEnd(0, '/main/link1', '/main/link1');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
  public navigateByUrl(url: string) {
    location.hash = url;
  }
}

const appRoutes: Routes = [
  {
    path: 'main',
    component: MockLoginComponent,
    children: [
      {
        path: 'link1',
        component: MockLoginComponent
      },
      {
        path: 'link2',
        component: MockLoginComponent
      }
    ]
  },
  {
    path: '',
    component: MockLoginComponent
  }
];

class IPSLoggerServiceStub {
  subscribeErrors = jasmine.createSpy('subscribeErrors');
};

describe('Component: BreadcrumbsComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  const routerStub = new RouterStub();
  let router: Router;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BreadcrumbComponent, MockLoginComponent],
        providers: [
          { provide: Router, useValue: routerStub },
          { provide: ActivatedRoute, useValue: { root: { children: [] } } },
        ],
        imports: [
          HttpClientTestingModule,
          NoopAnimationsModule,
          CommonModule,
          RouterTestingModule.withRoutes(appRoutes)
        ]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(BreadcrumbComponent);
          component = fixture.componentInstance;
          router = TestBed.get(Router);
        });
    })
  );
});
