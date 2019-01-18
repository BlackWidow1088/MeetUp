
// main.worker.ts and its dependencies are converted to main.worker.js used by html5 webworker for processing.
// all .ts business logic functions required for transpilation to main.worker.js
// should be placed in src/app/webworker/workers.
// Object of AppWorkers class has method workerBroker() to control execution
// of different worker files under one hood.
// all worker.ts classes have pure functions, so they are declared as abstract classes to avoid
// creation of new objects on calling repetitively.

import './polyfills.js';
import { AppWorkers } from './app-workers';

export const worker = new AppWorkers(self);
addEventListener('message', (event: MessageEvent) => {
  worker.workerBroker(event);
});
