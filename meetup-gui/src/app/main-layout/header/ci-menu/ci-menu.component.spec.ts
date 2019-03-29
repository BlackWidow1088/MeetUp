import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CIMenuComponent } from './ci-menu.component';
import { ActiveRouterLinkService } from 'app/core/services/active-router-link.service';
import { AspectService } from 'app/shared/services';
import { aspectServiceStub } from 'app/shared/stubs/service-stub';

class RouterStub {
  navigate = jasmine.createSpy('navigate');
  url = 'csa/ci';
}

describe('CIMenuComponent', () => {
  let component: CIMenuComponent;
  let fixture: ComponentFixture<CIMenuComponent>;
  let aspectService: AspectService;

  const routerStub = new RouterStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CIMenuComponent ],
      providers: [
        ActiveRouterLinkService,
        { provide: AspectService, useValue: aspectServiceStub },
        { provide: Router, useValue: routerStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    aspectService = TestBed.get(AspectService);
    fixture = TestBed.createComponent(CIMenuComponent);

    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should drop down index', () => {
    component.displayDropDown = 0;
    component.dropDownIndex = 0;
    component.showDropDown(0);
    expect(component.displayDropDown).toBeTruthy();
    expect(component.dropDownIndex).toEqual(0);
  });

  describe('on ngOnChanges', () => {
    beforeEach(() => {
      component.moreOptions = [{
        label: 'History',
        visible: true,
        queryParams: {
          key: 'system.permission.can_view_history'
        }
      }, {
        label: 'Modify',
        visible: true
      }, {
        label: 'Delete',
        visible: true
      }];
    });

    it('should show history if aspect returns true and rdocId is not null', () => {
      const changes = Object.assign({
        selectedSystem: {
          currentValue: {
            rdocId: '123'
          }
        }
      });

      spyOn(aspectService, 'hasSystemAspect').and.returnValue(true);
      component.ngOnChanges(changes);

      expect(component.moreOptions[0].visible).toEqual(true);
      expect(component.moreOptions[1].styleClass).toEqual('fp-menu-separator');
    });

    it('should hide history if aspect returns false', () => {
      const changes = Object.assign({
        selectedSystem: {
          currentValue: {
            rdocId: '123'
          }
        }
      });

      spyOn(aspectService, 'hasSystemAspect').and.returnValue(false);
      component.ngOnChanges(changes);

      expect(component.moreOptions[0].visible).toEqual(false);
      expect(component.moreOptions[1].styleClass).toEqual('');
    });

    it('should hide history if rdocId is null', () => {
      const changes = Object.assign({
        selectedSystem: {
          currentValue: {
            rdocId: null
          }
        }
      });

      spyOn(aspectService, 'hasSystemAspect').and.returnValue(true);
      component.ngOnChanges(changes);

      expect(component.moreOptions[0].visible).toEqual(false);
      expect(component.moreOptions[1].styleClass).toEqual('');
    });
  });

  it('should Router Link Active', () => {
    expect(component.isRouterLinkActive('test')).toBeFalsy();
  });

  it('should call createLink', () => {
    expect(component.createLink('csa/dashboard', {systemId: 1, rdocId: 2})).toBeUndefined();
  });

  it('should call trackByFn', () => {
    expect(component.trackByFn(1)).toEqual(1);
  });
});
