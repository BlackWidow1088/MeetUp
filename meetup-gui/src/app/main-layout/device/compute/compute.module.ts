import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputeRoutingModule } from 'src/app/main-layout/device/compute/computing-routing.module';
import { ComputeLandingComponent } from 'src/app/main-layout/device/compute/compute-landing/compute-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';

// feature module type: Routed Module
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComputeRoutingModule
  ],
  declarations: [
    ComputeLandingComponent
  ]
})
export class ComputeModule { }
