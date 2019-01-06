
import { ITranslationService, I18NEXT_SERVICE, I18NextLoadResult, defaultInterpolationFormat, I18NextModule } from 'angular-i18next';
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import { environment } from 'src/environments/environment';

const i18nextOptions = function() {
  return {
  lng: `${environment['userLanguage']}`,
  whitelist: [`${environment['userLanguage']}`, 'en'],
  fallbackLng: 'en',
  debug: true, // set debug?
  returnEmptyString: false,
  ns: [
    'common'
  ],
  defaultNS: 'common',
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
  // backend plugin options
  backend: {
    loadPath: function(langs, ns) {
      return `assets/locales/${environment['userLanguage']}/{{ns}}.json`;
    }
  }
}
};

export function appInit(i18next: ITranslationService) {
  return () => {
    const promise: Promise<I18NextLoadResult> = i18next
      .use(i18nextXHRBackend)
      .init(i18nextOptions());
    return promise;
  };
}


export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }
];
