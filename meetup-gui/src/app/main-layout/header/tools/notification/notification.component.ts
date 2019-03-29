import { Component, OnInit, ViewChild } from '@angular/core';

import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiBaseService, IPSLoggerService } from 'app/shared/services/index';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @ViewChild('notificationCount') userNotifAnimated;
  notification: Subscription;
  notificationList: any[];
  totalNotifications: number = 0;
  notificationAcknowledge: boolean = false;

  constructor(private apiBaseService: ApiBaseService,
    private ipsLogger: IPSLoggerService) { }

  ngOnInit() {

    this.notification = interval(30000).pipe(
      switchMap(() => this.apiBaseService.get(`/users/notifications`)))
      .subscribe(
        data => {
          if (data) {
            this.notificationList = data;
            this.notificationList.sort(function (a, b) {
              return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            });

            const notificationCount = this.notificationList.length;

            if (notificationCount > this.totalNotifications) {
              this.notificationAcknowledge = true;
              this.userNotifAnimated.nativeElement.classList.add('animated');

              setTimeout(() => {
                this.userNotifAnimated.nativeElement.classList.remove('animated');
              }, 5000);
            }

            this.totalNotifications = this.notificationList.length;
          }
        },
        error => {
          this.ipsLogger.subscribeErrors(
            error.name,
            error.message,
            this.constructor.name,
            'routeChange',
            'ngOnInit'
          );
        });
  }

  dismissUserNotification(id?) {
    this.notificationList = id ? this.notificationList.filter(notif => notif.id !== id) : [];
    this.totalNotifications = this.notificationList.length;
    this.deleteUserNotification(id);
  }

  private deleteUserNotification(id?) {
    let url = `/users/notifications`;
    if (id) {
      url = url.concat(`?notification_id=${id}`);
    }
    this.apiBaseService.delete(url).subscribe(error => {
      this.ipsLogger.subscribeErrors(
        error.name,
        error.message,
        this.constructor.name,
        'routeChange',
        'ngOnInit'
      );
    });
  }

  mapStatusToIcon = (type): string => {
    let image = 'assets/icons/Icon-Information.svg';
    switch (type) {
      case 'Fail':
        image = 'assets/icons/Icon-Error.svg'
        break;
      case 'Pass':
        image = 'assets/icons/Icon-Success.svg'
        break;
      case 'Warn':
        image = 'assets/icons/Icon-Warning.svg'
        break;
      case 'Info':
        image = 'assets/icons/Icon-Information.svg'
        break;
    }
    return image;
  }

}
