import { WorkerTopic } from './worker-topic.constant';

export interface WorkerMessage {
  topic: WorkerTopic;
  data: any;
}
