import { WorkerMessage, WorkerTopic } from './model';

export abstract class ComputeWorker {
  static doWork(data: WorkerMessage) {
    const calculatedData: WorkerMessage = {
      topic: data.topic,
      data: {message: 'modifed message'}
    };
    console.log('inside compute worker');
    console.log(data);
    return calculatedData;
  }
}
