import {CommonModule, isPlatformServer} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  Inject,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID
} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslationLinkActiveDirective} from './directives/translation-link-active.directive';
import {TranslationLinkDirective} from './directives/translation-link.directive';
import {TranslationManagerConfig} from './interfaces/translation-manager-config.interface';
import {translateClientFactory} from './loader/translate-client.loader';
import {translateServerFactory} from './loader/translate-server.loader';
import {TranslationManagerService} from './services/translation-manager.service';
import {TRANSLATION_MANAGER_CONFIG_TOKEN} from './tokens/translatio-manager-config.token';


const createTranslateLoader = (http: HttpClient, plateformId: object) => {
  return isPlatformServer(plateformId) ? translateServerFactory() : translateClientFactory(http);
};
const TRANSLATE_MODULE_CONFIG = {
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient, PLATFORM_ID]
  }
};

const DECLARATIONS = [TranslationLinkDirective, TranslationLinkActiveDirective];
const EXPORTS = [TranslateModule, ...DECLARATIONS];

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
    private translationManagerService: TranslationManagerService,
    @Inject(TRANSLATION_MANAGER_CONFIG_TOKEN) private translationManagerConfig
  ) {
    this.translationManagerService.setDefaultLang(translationManagerConfig.defaultLang);
  }

}
