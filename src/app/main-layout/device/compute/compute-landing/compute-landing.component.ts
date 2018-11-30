import { Component, OnInit } from '@angular/core';
import { WebworkerService } from 'src/app/webworker/service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/store/service';
import { ComputeActions } from 'src/app/application-store/action-reducer';
import { ApplicationState } from 'src/app/application-store/model';

@Component({
  selector: 'app-compute-landing',
  templateUrl: './compute-landing.component.html',
  styleUrls: ['./compute-landing.component.scss']
})
export class ComputeLandingComponent implements OnInit {

  counter: Observable<number>;
  constructor(private webWorkerService: WebworkerService, private storeService: StoreService) {
  }

  ngOnInit() {
    const id = this.webWorkerService.createWorker();
    const subs = this.webWorkerService.listenWorker(id).subscribe(data => {
      console.log('inside compute landing');
      console.log(data);
    });
    this.webWorkerService.assignWorker(id, {
      topic: this.webWorkerService.workerTopicList.computeWorker,
      data: { message: 'message passed from compute landing' }
    });
    this.counter = this.storeService.select(['compute']).pipe(
      map((data: ApplicationState) => data['compute'].idList[0])
    );
  }

  increment() {
    this.storeService.dispatch({type: ComputeActions.pushId, payload: {}});
  }

  decrement() {
    this.storeService.dispatch({type: ComputeActions.deleteId, payload: {}});
  }

}
