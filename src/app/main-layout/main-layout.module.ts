import { NgModule } from '@angular/core';
import { MainLayoutComponent } from 'src/app/main-layout/main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonsService } from './services';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   declarations: [
      MainLayoutComponent,
      DashboardComponent,
      LessonsComponent
   ],
   imports: [
      SharedModule,
      MainLayoutRoutingModule
   ],
  providers: [
    LessonsService
  ]
})
export class MainLayoutModule { }
