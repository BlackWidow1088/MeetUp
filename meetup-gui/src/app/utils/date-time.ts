import { environment } from 'src/environments/environment';

import { format } from 'date-fns';
import * as en from 'date-fns/locale/en';
import * as fr from 'date-fns/locale/fr';
import * as de from 'date-fns/locale/de';

const locales = {en, fr, de};
export function formatDateTime (date, formatStr) {
  return format(date, formatStr, {
    locale: locales[environment.userLanguage] // or global.__localeId__
  });
}
