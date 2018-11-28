import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebworkerService, WebworkerServiceConfig } from './service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    WebworkerService
  ]
})
export class WebworkerModule {
  constructor (@Optional() @SkipSelf() parentModule: WebworkerModule) {
    if (parentModule) {
      throw new Error(
        'WebworkerModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: WebworkerServiceConfig): ModuleWithProviders {
    return {
      ngModule: WebworkerModule,
      providers: [
        {provide: WebworkerServiceConfig, useValue: config }
      ]
    };
  }
 }
