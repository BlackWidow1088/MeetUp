import { Component, OnInit } from '@angular/core';
import { WebworkerService } from 'src/app/webworker/service';

@Component({
  selector: 'app-compute-landing',
  templateUrl: './compute-landing.component.html',
  styleUrls: ['./compute-landing.component.scss']
})
export class ComputeLandingComponent implements OnInit {

  constructor(private webWorkerService: WebworkerService) { }

  ngOnInit() {
    const id = this.webWorkerService.createWorker();
    const subs = this.webWorkerService.listenWorker(id).subscribe(data => {
      console.log('inside compute landing');
      console.log(data);
    });
    this.webWorkerService.assignWorker(id, {
      topic: this.webWorkerService.workerTopicList.computeWorker,
      data: {message: 'message passed from compute landing'}
    });
  }

}
