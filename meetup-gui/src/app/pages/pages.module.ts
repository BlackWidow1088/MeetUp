import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from 'src/app/pages/pages-routing.module';
import { ForbiddenComponent } from 'src/app/pages/forbidden/forbidden.component';
import { SharedModule } from 'src/app/shared/shared.module';

// feature module type: Routed Module
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
    ForbiddenComponent
  ]
})
export class PagesModule { }
