// Note:
// WebWorker service is wrapper on html5 webworker.

import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { LoggerService } from 'src/app/core/service/logger.service';

@Injectable({
  providedIn: 'root'
})
export class WebWorkerService {
  public readonly workerPath = 'assets/workers/main.js?t=' + Date.now();

  constructor(private logger: LoggerService ) {
  }

}
