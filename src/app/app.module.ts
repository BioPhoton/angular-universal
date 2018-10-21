import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app-routing';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SpeakerOverviewModule} from './features/speaker-overview/speaker-overview.module';


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
    RouterModule.forRoot(ROUTES, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
