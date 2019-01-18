import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from 'src/app/shared/notfound/notfound.component';
import { DeviceLandingComponent } from 'src/app/main-layout/device/device-landing/device-landing.component';

const routes: Routes = [
  {
    path: 'compute',
    loadChildren: 'src/app/main-layout/device/compute/compute.module#ComputeModule'
  },
  {
    path: ':deviceid',
    component: DeviceLandingComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
