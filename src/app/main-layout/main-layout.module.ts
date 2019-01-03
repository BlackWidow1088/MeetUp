import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from 'src/app/main-layout/main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonsService } from './services';

@NgModule({
   declarations: [
      MainLayoutComponent,
      DashboardComponent,
      LessonsComponent
   ],
   imports: [
      CommonModule,
      MainLayoutRoutingModule
   ],
  providers: [
    LessonsService
  ]
})
export class MainLayoutModule { }
