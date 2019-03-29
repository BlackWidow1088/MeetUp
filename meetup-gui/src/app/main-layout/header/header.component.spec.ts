import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from 'app/core/main-layout/header/header.component';
import { SystemsService } from 'app/core/services';
import { BannerMsgBoardService } from 'app/csa/ci/ci-landing/banner-msg/banner-msg.service';
import { ApplicationMessageBoardService } from 'app/shared/application-message-board/application-message-board.service';
import { ApiBaseService, AspectService, DataService, IPSLoggerService, SnapshotService } from 'app/shared/services';
import { BannerMsgBoardServiceStub } from 'app/shared/stubs/constants-stub';
import { ConfirmationService } from 'primeng/components/common/api';
import { Observable, of, throwError } from 'rxjs';
import {
  apiBaseStub,
  applicationMessageBoardServiceStub,
  aspectServiceStub,
  confirmationServiceStub,
  ipsloggerServiceStub,
  systemsServiceStub,
  systemData,
  snapshotServiceStub
} from 'app/shared/stubs/service-stub';
import { SystemDiagramDataService } from 'app/csa/ci/system-diagram/services/system-diagram-data.service';
import { SystemDiagramDataServiceStub } from 'app/csa/ci/system-diagram/stubs';
import { SNAPSHOT_STATUS } from 'app/shared/common/returnTypes-functions';

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

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let confirmationService: ConfirmationService;
  let apiBaseService: ApiBaseService;
  let routerService: RouterStub;
  let ipslogger: IPSLoggerService;
  let messageBoardService: ApplicationMessageBoardService;
  let systemsService: SystemsService;
  let bannerMsgBoardService: BannerMsgBoardService;

  const routerStub = new RouterStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        DataService,
        { provide: SystemsService, useValue: systemsServiceStub },
        { provide: ApiBaseService, useValue: apiBaseStub },
        { provide: ConfirmationService, useValue: confirmationServiceStub },
        { provide: AspectService, useValue: aspectServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: IPSLoggerService, useValue: ipsloggerServiceStub },
        { provide: ApplicationMessageBoardService, useValue: applicationMessageBoardServiceStub },
        { provide: BannerMsgBoardService, useValue: BannerMsgBoardServiceStub },
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub },
        { provide: SnapshotService, useValue: snapshotServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    confirmationService = TestBed.get(ConfirmationService);
    apiBaseService = TestBed.get(ApiBaseService);
    routerService = TestBed.get(Router);
    ipslogger = TestBed.get(IPSLoggerService);
    messageBoardService = TestBed.get(ApplicationMessageBoardService);
    bannerMsgBoardService = TestBed.get(BannerMsgBoardService);
    systemsService = TestBed.get(SystemsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('should test onDeleteCI method', () => {
    it('should call onDeleteCI method', () => {
      spyOn(confirmationService, 'confirm').and.callFake((params: any) => {
        params.accept();
      });
      spyOn(apiBaseService, 'delete').and.returnValue(of(true));
      expect(component.onDeleteCI()).toBeUndefined();
      expect(apiBaseService.delete).toHaveBeenCalledWith('/system/04d52de2907a47149a44eacdf64b5c98');
    });

    it('should call onDeleteCI - with error', () => {
      spyOn(confirmationService, 'confirm').and.callFake((params: any) => {
        params.accept();
      });
      spyOn(apiBaseService, 'delete').and.returnValue(
        throwError({
          name: 'Error',
          message: 'Error',
        })
      );
      expect(component.onDeleteCI()).toBeUndefined();
      expect(apiBaseService.delete).toHaveBeenCalledWith('/system/04d52de2907a47149a44eacdf64b5c98');
    });

    it('should set showModifyDeleteRestrictionDialog to false when status is loading', () => {
      component.snapshotStatus = SNAPSHOT_STATUS.LOADING;
      component.onDeleteCI();
      expect(component.showModifyDeleteRestrictionDialog).toEqual(true);
    });

    it('should set showModifyDeleteRestrictionDialog to false when status is inProgress', () => {
      component.snapshotStatus = SNAPSHOT_STATUS.INPROGRESS;
      component.onDeleteCI();
      expect(component.showModifyDeleteRestrictionDialog).toEqual(true);
    });
  });

  it('should get system list', () => {
    expect(component.getSystemList()).toEqual([]);
  });

  it('should get Time', () => {
    expect(component.getTime()).toBeDefined();
  });

  it('should call trackByFn', () => {
    expect(component.trackByFn(1)).toEqual(1);
  });

  it('should call redirectToSupportContractPage', () => {
    component.redirectToSupportContractPage(1);
    expect(routerService.navigate).toHaveBeenCalled();
  });

  it('should call bannerMsgSubscription to check if oldrdoc and moreOptions[0].visible is false', () => {
    component.bannerMsgSubscription(systemData);

    expect(component.bannerMsgSubscription(systemData)).toBeUndefined();
    expect(component.isOldRdoc).toBeFalsy();
    expect(component.moreOptions[0].visible).toBeTruthy();
  });

  it('should remove System Diagram option from submenu', () => {
    component.isOldRdoc = true;
    component.systemType = 'flexpoddc';
    component.handleSubMenuOptions();
    expect(component.subMenuOptions.filter(menu => menu.title === `System Diagram`).length).toEqual(0);
  });

  it('should remove System Diagram option from submenu', () => {
    component.systemType = 'nflex';
    component.handleSubMenuOptions();
    expect(component.subMenuOptions.filter(menu => menu.title === `System Diagram`).length).toEqual(0);
  });

  it('should add System Diagram option to submenu if it does not exists', () => {
    component.isOldRdoc = false;
    component.systemType = 'flexpoddc';
    component.handleSubMenuOptions();
    expect(component.subMenuOptions.filter(menu => menu.title === `System Diagram`).length).toEqual(1);
  });

  it('should not add welcome guide to navigation menu', () => {
    component.extendDcDashboardNavigationMenu();
    expect(component.mainNavOptions.filter(option => option.title === 'welcome guide').length).toEqual(0);
  });

  it ('should call blockModifyOrDeleteDialogClick', () => {
    component.blockModifyOrDeleteDialogClick();
    expect(component.showModifyDeleteRestrictionDialog).toEqual(false);
  });

  describe('should test onModify method', () => {
    it('should set showModifyDeleteRestrictionDialog to false when status is loading', () => {
      component.snapshotStatus = SNAPSHOT_STATUS.LOADING;
      component.onModifyCI();
      expect(component.showModifyDeleteRestrictionDialog).toEqual(true);
    });

    it('should set showModifyDeleteRestrictionDialog to false when status is inProgress', () => {
      component.snapshotStatus = SNAPSHOT_STATUS.INPROGRESS;
      component.onModifyCI();
      expect(component.showModifyDeleteRestrictionDialog).toEqual(true);
    });

    it('should call router navigate when status is not loading or inProgress', () => {
      component.snapshotStatus = SNAPSHOT_STATUS.COLLECT;
      component.onModifyCI();
      expect(component.showModifyDeleteRestrictionDialog).toEqual(false);
      expect(routerService.navigate).toHaveBeenCalled();
    });
  });
});
