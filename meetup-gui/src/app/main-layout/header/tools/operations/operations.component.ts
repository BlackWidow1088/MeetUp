import { Component, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SystemsService } from 'app/core/services';
import { IPSLoggerService, JobService } from 'app/shared/services';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  jobCount: number = 0;
  hasJobCountAcknowledgement: boolean;
  pollingSubscriber: Subscription;

  constructor(
    private systemService: SystemsService,
    private jobService: JobService,
    private ipsLogger: IPSLoggerService,
  ) { }

  ngOnInit() {
    this.loadJobCount();
    this.jobService.getServiceResponse().subscribe(response => {
      if (response) {
        this.jobCount = response;
      }
    });
    this.hasJobCountAcknowledgement = true;
  }

  toggleJobNotification() {
    this.hasJobCountAcknowledgement = false;
  }

  loadJobCount(): void {
    this.pollingSubscriber = interval(20000)
    .pipe(switchMap(() => this.jobService.getJobDetails(this.systemService.getOwnerSystems())))
      .subscribe(data => {
        this.jobService.notifyJobSubscribers(data.length);
      },
      error => {
        this.ipsLogger.subscribeErrors(
          error.name,
          error.message,
          this.constructor.name,
          'loadJobCount',
          'getJobDetails'
        );
      })
    }

}
