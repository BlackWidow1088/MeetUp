import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemDiagramComponent } from 'src/app/main-layout/system-diagram/system-diagram.component';

const routes: Routes = [
  {
    path: '',
    component: SystemDiagramComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemDiagramRoutingModule { }
