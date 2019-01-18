import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ForbiddenComponent } from 'src/app/pages/forbidden/forbidden.component';
import { NotfoundComponent } from 'src/app/shared/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'forbidden',
    component: ForbiddenComponent
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
export class PagesRoutingModule { }
