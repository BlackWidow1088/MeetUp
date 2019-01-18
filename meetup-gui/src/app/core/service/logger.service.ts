import { Injectable } from '@angular/core';
import { Log } from '../model';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

constructor() { }
error(data: Log) { }
success(data: Log) { }
}
