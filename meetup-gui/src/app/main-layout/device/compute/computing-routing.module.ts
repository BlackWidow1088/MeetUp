import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from 'src/app/shared/notfound/notfound.component';
import { ComputeLandingComponent } from 'src/app/main-layout/device/compute/compute-landing/compute-landing.component';

const routes: Routes = [
  {
    path: ':computeid',
    component: ComputeLandingComponent,
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
export class ComputeRoutingModule { }
