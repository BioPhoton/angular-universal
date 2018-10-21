import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ROUTES} from './app-routing';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SpeakerOverviewModule} from './features/speaker-overview/speaker-overview.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const DECLARATIONS = [];

@NgModule({
  declarations: [
    AppComponent,
    DECLARATIONS
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    CoreModule.forClient(),
    SpeakerOverviewModule,
    RouterModule.forRoot(ROUTES, {}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
