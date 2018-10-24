import {CommonModule, isPlatformServer} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID
} from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {TranslationManagerService} from './services/translation-manager.service';
import {SetLangDirective} from './directives/set-lang.directive';
import {TranslationManagerConfig} from './interfaces/translation-manager-config.interface';
import {translateClientFactory} from './loader/translate-client.loader';
import {translateServerFactory} from './loader/translate-server.loader';


const createTranslateLoader = (http: HttpClient, plateformId: object) => {
  return isPlatformServer(plateformId) ? translateServerFactory() : translateClientFactory(http);
};

const DECLARATIONS = [SetLangDirective];
const EXPORTS = [TranslateModule, ...DECLARATIONS];

const TRANSLATE_MODULE_CONFIG = {
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient, PLATFORM_ID]
  }
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG)
  ],
  declarations: [DECLARATIONS],
  exports: [EXPORTS]
})
export class TranslationManagerModule {

  static config: TranslationManagerConfig = {
    languages: ['en'],
    defaultLang: 'en'
  };

  static forRoot(config: TranslationManagerConfig): ModuleWithProviders {
    if (config) {
      TranslationManagerModule.config = config;
    }

    return {
      ngModule: TranslationManagerModule,
      providers: [
        TranslationManagerService
      ]
    };
  }

  static forFeature(): ModuleWithProviders {
    return {
      ngModule: TranslationManagerModule,
      providers: []
    };
  }

  /**/
  constructor(
    private translateService: TranslateService,
    private translationManagerService: TranslationManagerService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.translationManagerService.setDefaultLang(TranslationManagerModule.config.defaultLang);
    this.translationManagerService.switchLang(translateService.getBrowserLang());
  }

}
