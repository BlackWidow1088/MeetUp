
// CoreModule
// CoreModule is a conventional name for an NgModule with providers for the singleton services you load when the application starts.

// Import CoreModule in the root AppModule only. Never import CoreModule in any other module.

// Consider making CoreModule a pure services module with no declarations.
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiBaseService, DataService, SystemService,
   LoggerService, AuthenticationService, CommonErrorService, CoreServiceConfig, UploadService } from './service';

// module type: Core Module
// exports: services
@NgModule({
  providers:    [
    SystemService,
    LoggerService,
    AuthenticationService,
    ApiBaseService,
    CommonErrorService,
    DataService,
    UploadService
    ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: CoreServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: CoreServiceConfig, useValue: config },
      ]
    };
  }
}
