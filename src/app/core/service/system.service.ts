
import { Injectable, Optional } from '@angular/core';

export class SystemServiceConfig {
  userName = 'Default User';
}
@Injectable({
  providedIn: 'root'
})
export class SystemService {

constructor(@Optional() config: SystemServiceConfig) { }

}
