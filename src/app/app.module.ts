import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app.routing.module';
import {Error404Component} from './components/error404/error404.component';
import {HomeComponent} from './components/home/home.component';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    CoreModule.forClient(),
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
