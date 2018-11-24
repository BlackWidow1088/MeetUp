import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceLandingComponent } from './device-landing/device-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
;

// feature module type: Routed Module
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DeviceRoutingModule
  ],
  declarations: [
    DeviceLandingComponent
  ]
})
export class DeviceModule { }
