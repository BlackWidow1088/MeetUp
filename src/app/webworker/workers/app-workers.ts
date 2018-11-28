import { ComputeWorker } from './compute.worker';
import { WorkerMessage, WorkerTopic } from './model';

export class AppWorkers {
  workerCtx: any;
  created: Date;

  constructor(workerCtx: any) {
    this.workerCtx = workerCtx;
    this.created = new Date();
  }

  workerBroker(event: MessageEvent): void {
    const workerMessage = event.data as WorkerMessage;
    switch (workerMessage.topic) {
      // Add references to worker.ts here and declare logic
      case WorkerTopic.computeWorker:
        this.returnWorkResults(ComputeWorker.doWork(workerMessage));
        break;
      default:
        this.returnWorkResults({topic: workerMessage.topic, data: { error: { code: 1, message: 'Topic Not Supported' } }} as WorkerMessage);
    }
  }

  /**
   * Posts results back through to the worker
   * @param {WorkerMessage} message
   */
  returnWorkResults(message: WorkerMessage): void {
    this.workerCtx.postMessage(message);
  }

}
