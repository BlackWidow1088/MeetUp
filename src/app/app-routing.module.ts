import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from 'src/app/shared/notfound/notfound.component';

// the search for navigation of routes is followed in the order as same as they are declared
const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/main-layout/main-layout.module#MainLayoutModule',
  },
  {
    path: 'app/pages',
    loadChildren: 'src/app/pages/pages.module#PagesModule'
  },
  {
    path: 'app/login',
    loadChildren: 'src/app/login/login.module#LoginModule'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
 }
