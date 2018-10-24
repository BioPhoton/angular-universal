import {CommonModule, isPlatformServer} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  Inject, ModuleWithProviders, NgModule,
  PLATFORM_ID
} from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {SetLangDirective} from './directives/set-lang.directive';
import {TranslationManagerConfig} from './interfaces/translation-manager-config.interface';
import {translateClientFactory} from './loader/translate-client.loader';
import {translateServerFactory} from './loader/translate-server.loader';
import {TranslationManagerService} from './services/translation-manager.service';
import {TRANSLATION_MANAGER_CONFIG_TOKEN} from './tokens/translatio-manager-config.token';


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

    return {
      ngModule: TranslationManagerModule,
      providers: [
        {
          provide: TRANSLATION_MANAGER_CONFIG_TOKEN,
          useValue: config
        },
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

  constructor(
    private translateService: TranslateService,
    private translationManagerService: TranslationManagerService,
    @Inject(TRANSLATION_MANAGER_CONFIG_TOKEN) private translationManagerConfig
  ) {
    this.translationManagerService.setDefaultLang(translationManagerConfig.defaultLang);
    this.translationManagerService.switchLang(translateService.getBrowserLang());
  }

}
