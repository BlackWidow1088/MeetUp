// Note:
// WebWorker service is wrapper on html5 webworker.


// Web Workers are in-browser threads that can be used to execute JavaScript code without blocking the event loop.

// This is truly amazing. The whole paradigm of JavaScript is based on the idea of single-threaded environment
// but here come Web Workers which remove (partially) this limitation.
// Web Workers allow you to do things like firing up long-running scripts to handle
// computationally intensive tasks, but without blocking the UI.
// In fact, it all takes place in parallel .
// Web Workers are truly multi-threaded.
// Web Workers are not part of JavaScript, they’re a browser feature which can be
// accessed through JavaScript. Most browsers have historically been single-threaded
//  (this has, of course, changed), and most JavaScript implementations happen in the browser.
//  Web Workers are not implemented in Node.JS — it has a concept of “cluster” or “child_process”
//   which is a bit different.
// Web Workers run in an isolated thread in the browser.
//  As a result, the code that they execute needs to be contained in a separate file.
// That’s very important to remember.

// Use cases:
// 1) ray-tracing: ray tracing is a rendering technique for generating an image by tracing the path of light as pixels. Ray tracing uses very CPU-intensive mathematical computations in order to simulate the path of light.
// 2) Encryption
// 3) Prefetching data
// 4) Progressive web apps: they have to load quickly even when the network connection is shaky.
//    This means that data has to be stored locally in the browser.
//    This is where IndexDB or similar APIs comes into play.
//    Basically, a client-side storage is needed.
//    In order to be used without blocking the UI thread, the work has to be done in Web Workers. Well, in the case of IndexDB, there is an asynchronous API that allows you to do this even without workers, but there was a synchronous API before (it might be introduced again) which should only be used inside workers.
// 5) Spell-checking

// speed of webworkworkers:
// Web workers take about 40 ms to be instantiated.
// Also, this time is pretty stable with variations of only a few milliseconds.
//  Setting up a broadcast channel is usually done within 1 ms.

// Under normal circumstances, the browser UI is refreshed at a rate of 60 frames per second.
//  This means that no JavaScript code should run longer than the time needed by a frame,
//  i.e., 16.66ms (60 frames per second).
//  Otherwise, you may introduce jankiness and lag in your application.

// Instantiating web workers is pretty efficient, but still may not fit in the time
// allocated for a single frame. That’s why it’s important to create as few web workers as
// possible and reuse them.

// The size of messages
// There are 2 ways to send messages to web workers:

// Copying the message
// Transferring the message
// In the first case, the message is serialized, copied, and sent over.
// In the latter, the data is transferred. This means that the original sender can no longer
//  use it once sent. Transferring data is almost instantaneous, so there is no real point
//   in benchmarking that. However, only ArrayBuffer is transferable.

// As expected, serializing, copying, and de-serializing data adds significant
// overhead to the message transmission. The bigger the message, the longer it takes to be sent.

// The benchmark here sends a typed array to a web worker. Its size is progressively
//  increased at each iteration. There is a linear correlation between size of the message
//  and transfer time. For each measurement, we can divide the size (in kilobytes) by the
//  time (in milliseconds) to get the transfer speed in kb/ms.

// Typically, on a Flame, the transfer speed is 80 kB/ms for postMessage and 12 kB/ms using
//  broadcast channel. This means that if you want your message to fit in a single frame,
//  you should keep it under 1,300 kB with postMessage and under 200 kB when using the broadcast
//   channel. Otherwise, it may introduce frame drop in your application.

// In this benchmark, we use typed arrays, because it makes it possible to determine their
// size in kilobytes precisely. You can also transfer JavaScript objects,
//  but due to the serialization process, they take longer to post.
//  For small objects, this doesn’t really matter, but if you need to send huge objects,
//  you may as well serialize them to a binary format.
// You can use something similar to Protocol Buffer.

import { Injectable, Optional } from '@angular/core';
import { fromEvent, Subscription, Observable, Subject, of } from 'rxjs';
import { WebworkerServiceConfig } from 'src/app/webworker/service/webworker-service-config';
import { WorkerTopic, WorkerMessage } from 'src/app/webworker/workers/model';
import { Webworker } from 'src/app/webworker/model';
import { LoggerService } from 'src/app/core/service';
import { LogType } from 'src/app/core/model';

@Injectable({
  providedIn: 'root'
})
export class WebworkerService {
  readonly workerTopicList = WorkerTopic;
  private workerCount: number = 0;
  private workers: Webworker[] = [];
  constructor(@Optional() config: WebworkerServiceConfig, private logger: LoggerService) {
  }
  createWorker(): number {
    const cnt = this.workerCount++;
    this.workers.push(new Webworker(this.logger, cnt));
    return cnt;
  }
  listenWorker(id: number): Observable<WorkerMessage> {
   return this.workers[id] ? this.workers[id].listenFromWorker() : of(null);
  }
  terminateWorker(id: number): boolean {
    if (this.workers[id]) {
      const isTerminated = this.workers[id].terminateWorker();
      this.workers[id] = null;
      return isTerminated;
    }
    this.logger.error({message: `webworker thread id: ${id} not found with topic`
    , type: LogType.error });
    return false;
  }
  assignWorker(id: number, workerMessage: WorkerMessage): boolean {
    if (this.workers[id]) {
      return this.workers[id].assignToWorker(workerMessage);
    }
    this.logger.error({message: `webworker thread id: ${id} not found with topic`
    , type: LogType.error });
    return false;
  }
}
