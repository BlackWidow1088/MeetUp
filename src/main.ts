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
  lang.forEach(item => {
    if (url.includes(item)) {
      const node = document.getElementsByTagName('base')[0];
      node.href = `/${item}`;
      environment.userLanguage = item;
    }
  });
}
configureLanguage();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
