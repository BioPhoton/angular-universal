import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app-routing';

import {AppComponent} from './app.component';
// Modules
import {CoreModule} from './core/core.module';
import {TranslationManagerModule} from '@universal-workspace/translation-manager';
// Feature Modules
import {SpeakerOverviewModule} from './features/speaker-overview/speaker-overview.module';
import {LayoutModule} from './modules/layout/layout.module';

export const DECLARATIONS = [];

@NgModule({
  declarations: [
    AppComponent,
    DECLARATIONS
  ],
  imports: [
    // Internal
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    CoreModule.forClient(),
    RouterModule.forRoot(ROUTES, {}),
    // Modules,
    TranslationManagerModule.forRoot({defaultLang: 'en', languages: ['en', 'de']}),
    LayoutModule,
    // Features
    SpeakerOverviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
