import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MenuComponent } from './menu.component';
import { TitleToUrlPipe } from 'app/shared/pipes/title-to-url.pipe';
import { ActiveRouterLinkService } from 'app/core/services/active-router-link.service';
import { routerStub } from 'app/shared/stubs/constants-stub';

describe('DashboardMenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent, TitleToUrlPipe ],
      providers: [
        ActiveRouterLinkService,
        { provide: Router, useValue: routerStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call trackByFn', () => {
    expect(component.trackByFn(1)).toEqual(1);
  });
});
