import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

import TranslationsEn from '@universal-workspace/universal-app/assets/i18n/en.json';
import TranslationsDe from '@universal-workspace/universal-app/assets/i18n/de.json';

const TRANSLATIONS = {
  en: TranslationsEn,
  de: TranslationsDe
};

export class TranslateServerLoader implements TranslateLoader {

  public getTranslation(lang: string): Observable<any> {
    return of(TRANSLATIONS[lang]);
  }
}

export function translateServerFactory() {
  return new TranslateServerLoader();
}
