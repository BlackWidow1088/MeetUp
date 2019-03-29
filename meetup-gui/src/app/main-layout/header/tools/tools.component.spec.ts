import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservableMedia } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToolsComponent } from 'app/core/main-layout/header/tools/tools.component';
import { ApplicationMessageBoardService } from 'app/shared/application-message-board/application-message-board.service';
import { TimeAgoPipe } from 'app/shared/pipes/time-ago.pipe';
import { ApiBaseService, AuthenticationService, DataService, IPSLoggerService, UserPreferenceService, UserService } from 'app/shared/services';
import { apiBaseStub, applicationMessageBoardServiceStub, ipsloggerServiceStub, preference, userInfo, userPreferenceServiceStub } from 'app/shared/stubs/service-stub';
import { Observable, of } from 'rxjs';

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

const userServiceStub = {
  getUserInfo: () => of(userInfo)
};

class AuthServiceStub {
  logout = jasmine.createSpy('logout');
};

describe('ToolsComponent', () => {
  let component: ToolsComponent;
  let fixture: ComponentFixture<ToolsComponent>;
  let routerService: RouterStub;
  let userPreferenceService: UserPreferenceService;
  let apiBaseService: ApiBaseService;
  let userService: UserService;
  let messageBoardService: ApplicationMessageBoardService;
  let ipslogger: IPSLoggerService;
  let authService: AuthServiceStub;
  let mockObservableMedia;

  const routerStub = new RouterStub();
  const authServiceStub = new AuthServiceStub();

  beforeEach(async(() => {
    mockObservableMedia = { asObservable: () => of({}) };
    TestBed.configureTestingModule({
      declarations: [ToolsComponent, TimeAgoPipe],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 'a2b6e24e8e014d059118c7cd045849ff'
            })
          }
        },
        DataService,
        { provide: ObservableMedia, useValue: mockObservableMedia },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: ApiBaseService, useValue: apiBaseStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: UserPreferenceService, useValue: userPreferenceServiceStub },
        { provide: ApplicationMessageBoardService, useValue: applicationMessageBoardServiceStub },
        { provide: IPSLoggerService, useValue: ipsloggerServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    apiBaseService = TestBed.get(ApiBaseService);
    routerService = TestBed.get(Router);
    userPreferenceService = TestBed.get(UserPreferenceService);
    userPreferenceService.preferences = JSON.stringify(preference);
    userService = TestBed.get(UserService);
    messageBoardService = TestBed.get(ApplicationMessageBoardService);
    ipslogger = TestBed.get(IPSLoggerService);
    authService = TestBed.get(AuthenticationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsComponent);
    component = fixture.componentInstance;
  });

  afterAll(() => {
    userPreferenceService.preferences = null;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should create menu and check label to be equal', () => {
    component.pMenuDataDisplay();
    expect(component.userLogin[0].label).toEqual('Log out');
    expect(component.settings[0].label).toEqual('User Profile');
    expect(component.settings[1].label).toEqual('Alert Settings');
    expect(component.settings[2].label).toEqual('Licensing');
    expect(component.settings[3].label).toEqual('Users');
  });

  it('should logout and check if logout was called', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
