import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app-routing';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SpeakerOverviewModule} from './features/speaker-overview/speaker-overview.module';
import {TranslationManagerModule} from './modules/translation-manager/translation-manager.module';
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
    // Modules
    TranslationManagerModule,
    LayoutModule,
    // Features
    SpeakerOverviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
