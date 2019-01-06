import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function configureLanguage() {
  const url = document.URL;
  const lang = environment.supportedLanguages;
  for (const item of lang) {
    if (url.includes(item)) {
      environment.userLanguage = item;
      setBaseHref();
      return;
    }
  }
  environment.userLanguage = navigator.language;
  if (environment.userLanguage === 'en-US') {
    environment.userLanguage = 'en';
  }
  setBaseHref();
}
function setBaseHref() {
  const node = document.getElementsByTagName('base')[0];
  node.href = `/${environment.userLanguage}`;
}
configureLanguage();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
