
import { Injectable, Optional } from '@angular/core';
import { CoreServiceConfig } from 'src/app/core/service/core-service-config';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

constructor(@Optional() config: CoreServiceConfig) { }

}
