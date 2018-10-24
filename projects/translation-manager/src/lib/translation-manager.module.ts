import {CommonModule, isPlatformServer} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  Inject,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID
} from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {TranslationManagerService} from '@universal-workspace/translation-manager';
import {SetLangDirective} from './directives/set-lang.directive';
import {TranslationManagerConfig} from './interfaces/translation-manager-config.interface';
import {translateClientFactory} from './loader/translate-client.loader';
import {translateServerFactory} from './loader/translate-server.loader';


const createTranslateLoader = (http: HttpClient, plateformId: object) => {
  return isPlatformServer(plateformId) ? translateServerFactory() : translateClientFactory(http);
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, PLATFORM_ID]
      }
    }),
  ],
  declarations: [SetLangDirective],
  exports: [TranslateModule, SetLangDirective]
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

  constructor(
    private translateService: TranslateService, @Inject(PLATFORM_ID) private platformId) {
    this.translateService.setDefaultLang(TranslationManagerModule.config.defaultLang);
    this.translateService.use(translateService.getBrowserLang());
  }

}
