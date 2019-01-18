import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from 'src/app/login/login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// feature module type: Routed Module
@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
