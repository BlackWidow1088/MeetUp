import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from 'src/app/main-layout/main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
   declarations: [
      MainLayoutComponent,
      DashboardComponent
   ],
   imports: [
      CommonModule,
      MainLayoutRoutingModule
   ],
  providers: []
})
export class MainLayoutModule { }
