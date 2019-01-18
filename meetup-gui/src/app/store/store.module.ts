import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService, StoreServiceConfig } from 'src/app/store/service';
import { Container } from 'src/app/store/model';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StoreService
  ]
})
export class StoreModule {
  constructor (@Optional() @SkipSelf() parentModule: StoreModule) {
    if (parentModule) {
      throw new Error(
        'StoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: StoreServiceConfig): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [
        {provide: StoreServiceConfig, useValue: config },
      ]
    };
  }
 }
