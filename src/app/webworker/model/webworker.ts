import { Subject, Subscription, fromEvent } from 'rxjs';
import { WorkerMessage, WorkerTopic } from 'src/app/webworker/workers/model';
import { environment } from 'src/environments/environment';
import { LoggerService } from 'src/app/core/service';
import { LogType } from 'src/app/core/model';
import { WebworkerService } from 'src/app/webworker/service/webworker.service';

export class Webworker {
  workerThreadId: number;
  private worker: Worker;
  private workerSubject: Subject<WorkerMessage>;
  private workerMessageSubscription: Subscription;
  private workerTopic: WorkerTopic;

  constructor(private logger: LoggerService, private id: number) {
    this.workerThreadId = id;
    this.worker = new Worker(environment.workerPath);
    this.workerSubject = new Subject<WorkerMessage>();
    this.workerMessageSubscription = fromEvent(this.worker, 'message')
      .subscribe((response: MessageEvent) => {
        if (this.workerSubject) {
          this.workerSubject.next(response.data as WorkerMessage);
        }
      }, (error) => {
        this.logger.error({
          message: `webworker thread id: ${this.workerThreadId} failed
        while processing webworker topic: ${this.workerTopic}`, type: LogType.error
        });
        this.workerSubject.error(error);
      });
  }

  listenFromWorker() {
    return this.workerSubject.asObservable();
  }

  terminateWorker() {
    try {
      if (this.workerMessageSubscription) {
        this.workerMessageSubscription.unsubscribe();
      }
      this.worker.terminate();
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  assignToWorker(workerMessage: WorkerMessage) {
    if (this.worker && workerMessage.topic) {
      this.workerTopic = workerMessage.topic;
      this.worker.postMessage(workerMessage);
      return true;
    }
    return false;
  }

}
