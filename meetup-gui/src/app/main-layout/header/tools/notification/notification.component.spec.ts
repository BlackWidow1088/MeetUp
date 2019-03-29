import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeAgoPipe } from 'app/shared/pipes/time-ago.pipe';
import { ApiBaseService, IPSLoggerService } from 'app/shared/services';
import { apiBaseStub, ipsloggerServiceStub } from 'app/shared/stubs/service-stub';
import { of } from 'rxjs';
import { NotificationComponent } from './notification.component';

const notificationStub = [{
  id: 0,
  label: 'error',
  value: 'NetApp CSA System Auto_Aaron1 agent offline',
  timestamp: new Date()
}, {
  id: 1,
  label: 'error',
  value: 'NetApp CSA System Auto_Aaron1 agent offline',
  timestamp: new Date()
}];

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let apiBaseService: ApiBaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent, TimeAgoPipe],
      providers: [{ provide: ApiBaseService, useValue: apiBaseStub },
      { provide: IPSLoggerService, useValue: ipsloggerServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    apiBaseService = TestBed.get(ApiBaseService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(apiBaseService, 'delete').and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss user notification with id 0', () => {
    component.notificationList = notificationStub;
    component.dismissUserNotification(0);
    expect(component.notificationList.filter(notif => notif.id === 0).length).toEqual(0);
  });

  it('should dismiss all notification', () => {
    component.notificationList = notificationStub;
    component.dismissUserNotification();
    expect(component.notificationList.length).toEqual(0);
  });

  it('should return src', () => {
    expect(component.mapStatusToIcon('Fail')).toEqual('assets/icons/Icon-Error.svg');
    expect(component.mapStatusToIcon('Pass')).toEqual('assets/icons/Icon-Success.svg');
    expect(component.mapStatusToIcon('Warn')).toEqual('assets/icons/Icon-Warning.svg');
    expect(component.mapStatusToIcon('Info')).toEqual('assets/icons/Icon-Information.svg');
  });
});
