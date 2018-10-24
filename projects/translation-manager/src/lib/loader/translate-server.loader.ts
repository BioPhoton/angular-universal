import {TranslateLoader} from '@ngx-translate/core';
import TranslationsDe from '@universal-workspace/universal-app/assets/i18n/de.json';
import TranslationsEn from '@universal-workspace/universal-app/assets/i18n/en.json';
import {Observable, of} from 'rxjs';

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
