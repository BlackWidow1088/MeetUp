import { MainLayoutComponent } from 'src/app/main-layout/main-layout.component';
import { DashboardComponent } from 'src/app/main-layout/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/core/guard/index';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'app/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'app/device',
        loadChildren: 'src/app/main-layout/device/device.module#DeviceModule'
      },
      {
        path: 'app/dashboard',
        component: DashboardComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
