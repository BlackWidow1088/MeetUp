
import { switchMap } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageStyle, MessageType } from 'app/shared/application-message-board/application-message-board-model';
import { ApplicationMessageBoardService } from 'app/shared/application-message-board/application-message-board.service';
import { loadTimings } from 'app/shared/pagePerformance';
import { ApiBaseService, AuthenticationService, DataService, IPSLoggerService, UserPreferenceService, UserService } from 'app/shared/services/index';
import { environment } from 'environments/environment';
import { buildId } from 'assets/build';
import { MenuItem } from 'primeng/components/common/api';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit, OnDestroy {

  userNotifyStatus: Subscription;

  loggedInUserName: string;
  loggedInUserEmail: string;

  ifProdEnv: boolean = false;
  buildId = buildId;

  userNotifyobj: any;
  userPreferenceNotify: any = {};

  userLogin: MenuItem[];
  settings: MenuItem[];

  constructor(
    private router: Router,
    private dataService: DataService,
    private userPreferenceService: UserPreferenceService,
    private apiBaseService: ApiBaseService,
    private userService: UserService,
    private authService: AuthenticationService,
    private messageBoardService: ApplicationMessageBoardService,
    private ipsLogger: IPSLoggerService,
  ) {
    this.userService.getUserInfo().subscribe(
      info => {
        loadTimings.login.userInfoGet.received = Date.now();
        const userInfo = { ...info };
        this.dataService.userId = userInfo.id; // loggedin User ID
        this.dataService.userEmail = userInfo.email; // loggedin User Email
        this.dataService.loggInUser = userInfo.name; // loggedin User name
        this.dataService.companyName = (userInfo.company) ? userInfo.company : '';
        loadTimings.login.userPreferenceGet.fetch = Date.now();

        this.loggedInUserName = this.dataService.loggInUser;
        this.loggedInUserEmail = this.dataService.userEmail;
        this.pMenuDataDisplay();

        this.userPreferenceService.getUserPreference().subscribe(
          userpreferenceData => {
            loadTimings.login.userPreferenceGet.received = Date.now();
          },
          error => {
            loadTimings.login.userPreferenceGet.received = -1;
            this.dataService.removeLocalStorage();
            this.messageBoardService.enqueueMessage('An error occurred in user preference' + error._body, {
              style: MessageStyle.collapsible,
              type: MessageType.error
            })
            this.ipsLogger.error(
              { id: localStorage.getItem('userId') },
              'An error occurred while getting user preference'
            );
          }
        );
      },
      error => {
        loadTimings.login.userInfoGet.received = -1; // problem while getting userInfo
        this.dataService.removeLocalStorage();
        this.messageBoardService.enqueueMessage('An error occurred while getting userId from account API', {
          style: MessageStyle.single,
          type: MessageType.error
        });
        this.ipsLogger.error(
          { id: localStorage.getItem('userId') },
          'An error occurred while getting userId'
        );
      }
    );
  }

  ngOnInit() {
    this.ifProdEnv = environment.production;
    console.log('ifProdEnv ---', this.ifProdEnv);
    console.log('buildId ---', this.buildId.id);
  }

  ngOnDestroy(): void {

    if (this.userNotifyStatus) {
      this.userNotifyStatus.unsubscribe();
    }
  }

  pMenuDataDisplay = (): void => {
    this.userLogin = [
      {
        label: 'Log out',
        command: onclick => {
          this.logout();
        }
      }
    ];

    this.settings = [
      {
        label: 'User Profile',
        command: onclick => {
          this.router.navigate(['csa/userPreference']);
        }
      },
      {
        label: 'Alert Settings',
        command: onclick => {
          this.router.navigate(['csa/alert-settings']);
        }
      },
      {
        label: 'Licensing',
        command: onclick => {
          this.router.navigate(['csa/license']);
        }
      },
      {
        label: 'Users',
        command: onclick => {
          this.router.navigate(['csa/users']);
        }
      }
    ];
  }

  logout = (): void => {
    try {
      this.authService.logout();
    } catch (error) {
      this.ipsLogger.componentErrors(
        error.name,
        error.message,
        this.constructor.name,
        'logout'
      );
    }
  }
}
