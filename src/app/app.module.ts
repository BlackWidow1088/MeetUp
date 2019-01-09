// BrowserModule imports CommonModule, which contributes many common directives such as ngIf and ngFor. Additionally, BrowserModule re-exports CommonModule making all of its directives available to any module that imports BrowserModule.

// For apps that run in the browser, import BrowserModule in the root AppModule because it provides services that are essential to launch and run a browser app. BrowserModule’s providers are for the whole app so it should only be in the root module, not in feature modules. Feature modules only need the common directives in CommonModule; they don’t need to re-install app-wide providers.

// If you do import BrowserModule into a lazy loaded feature module, Angular returns an error telling you to use CommonModule instead.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { WebworkerModule } from './webworker/webworker.module';
import { StoreModule } from 'src/app/store/store.module';
import { USER, initialState } from 'src/app/application-store/model';
import { applicationContainer } from 'src/app/application-store/application-container.const';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from 'src/app/services/http-interceptor.service';
import { I18N_PROVIDERS } from 'src/app/utils/translator.util';
import { I18NextModule, ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { formatDateTime } from 'src/app/utils/date-time';
import { AuthGuard } from './guards';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      CoreModule.forRoot({userName: USER}),
      WebworkerModule.forRoot({userName: USER}),
      StoreModule.forRoot({containers: applicationContainer, initialState: initialState}),
      SharedModule,
      AppRoutingModule,
      HttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      I18NextModule.forRoot()
   ],
  providers: [
    I18N_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {
    console.log(formatDateTime(new Date(2014, 6, 2),
    'Do [de] MMMM YYYY'));
    this.i18NextService.events.languageChanged.subscribe(lang => {
      document.getElementsByTagName('title')[0].innerText = this.i18NextService.t('common:appTitle');
    });
  }
 }

// What's the difference between NgModules and JavaScript Modules?
// n an Angular app, NgModules and JavaScript modules work together.

// In modern JavaScript, every file is a module (see the Modules page of the Exploring ES6 website). Within each file you write an export statement to make parts of the module public.

// An Angular NgModule is a class with the @NgModule decorator—JavaScript modules don't have to have the @NgModule decorator. Angular's NgModule has imports and exports and they serve a similar purpose.


// What should I export?
// Export declarable classes that components in other NgModules are able to reference in their templates. These are your public classes. If you don't export a declarable class, it stays private, visible only to other components declared in this NgModule.

// You can export any declarable class—components, directives, and pipes—whether it's declared in this NgModule or in an imported NgModule.

// You can re-export entire imported NgModules, which effectively re-exports all of their exported classes. An NgModule can even export a module that it doesn't import.


// What is the forRoot() method?
// The forRoot() static method is a convention that makes it easy for developers to configure services and providers that are intended to be singletons. A good example of forRoot() is the RouterModule.forRoot() method.

// Apps pass a Routes object to RouterModule.forRoot() in order to configure the app-wide Router service with routes. RouterModule.forRoot() returns a ModuleWithProviders. You add that result to the imports list of the root AppModule.

// Only call and import a .forRoot() result in the root application module, AppModule. Importing it in any other module, particularly in a lazy-loaded module, is contrary to the intent and will likely produce a runtime error. For more information, see Singleton Services.

// For a service, instead of using forRoot(), specify providedIn: 'root' on the service's @Injectable() decorator, which makes the service automatically available to the whole application and thus singleton by default.

// RouterModule also offers a forChild static method for configuring the routes of lazy-loaded modules.

// forRoot() and forChild() are conventional names for methods that configure services in root and feature modules respectively.

// Angular doesn't recognize these names but Angular developers do. Follow this convention when you write similar modules with configurable service providers.


// Why is a service provided in a feature module visible everywhere?
// When you import an NgModule, Angular adds the module's service providers (the contents of its providers list) to the application root injector.

// This makes the provider visible to every class in the application that knows the provider's lookup token, or name.

// Extensibility through NgModule imports is a primary goal of the NgModule system. Merging NgModule providers into the application injector makes it easy for a module library to enrich the entire application with new services. By adding the HttpClientModule once, every application component can make HTTP requests.

// To limit access to a service, consider lazy loading the NgModule that provides that service

// Though you can limit access to a service by providing it in a lazy loaded module or providing it
// in a component, providing services in a component can lead to multiple instances of those
// services. Thus, the lazy loading is preferable.

// COMPONENT AND LAZYLOADED MODULES HAVE THEIR OWN CONTEXT CHILD INJECTOR.
// TO LIMIT SERVICE SCOPE ONLY TO THE MODULE YOU MUST LAZY LOAD THAT MODULE
// TO LIMIT SERVICE SCOPE TO THAT COMPONENT, DECLARE IN PROVIDERS BUT IT WILL GET CREATED ALWAYS
// WITH THE COMPONENT



//******* VERY VERY IMPORTANT:::: ********
// Why does lazy loading create a child injector?
// Angular adds @NgModule.providers to the application root injector, unless the NgModule is lazy-loaded. For a lazy-loaded NgModule, Angular creates a child injector and adds the module's providers to the child injector.

// This means that an NgModule behaves differently depending on whether it's loaded during application start or lazy-loaded later. Neglecting that difference can lead to adverse consequences.

// Why doesn't Angular add lazy-loaded providers to the app root injector as it does for eagerly loaded NgModules?

// The answer is grounded in a fundamental characteristic of the Angular dependency-injection system. An injector can add providers until it's first used. Once an injector starts creating and delivering services, its provider list is frozen; no new providers are allowed.

// When an applications starts, Angular first configures the root injector with the providers of all eagerly loaded NgModules before creating its first component and injecting any of the provided services. Once the application begins, the app root injector is closed to new providers.

// Time passes and application logic triggers lazy loading of an NgModule. Angular must add the lazy-loaded module's providers to an injector somewhere. It can't add them to the app root injector because that injector is closed to new providers. So Angular creates a new child injector for the lazy-loaded module context.



// There are five general categories of feature modules which tend to fall into the following groups:

// Domain feature modules.
// Routed feature modules.
// Routing modules.
// Service feature modules.
// Widget feature modules.

