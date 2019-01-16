import { NgModule } from '@angular/core';
import { MainLayoutComponent } from 'src/app/main-layout/main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonsService } from './services';
import { SharedModule } from '../shared/shared.module';
import { ApplicationMessageBoardService } from './application-message-board/application-message-board.service';
import { CollapsableMessageComponent } from './application-message-board/collapsable-message/collapsable-message.component';
import { ApplicationMessageBoardComponent } from './application-message-board/application-message-board/application-message-board.component';
import { SingleLineMessageComponent } from './application-message-board/single-line-message/single-line-message.component';

@NgModule({
   declarations: [
      MainLayoutComponent,
      DashboardComponent,
      LessonsComponent,
      SingleLineMessageComponent,
      CollapsableMessageComponent,
      ApplicationMessageBoardComponent
   ],
   imports: [
      SharedModule,
      MainLayoutRoutingModule
   ],
  providers: [
    LessonsService,
    ApplicationMessageBoardService
  ]
})
export class MainLayoutModule { }
