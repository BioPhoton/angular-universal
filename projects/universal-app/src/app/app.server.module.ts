import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {AppComponent} from './app.component';

import {AppModule} from './app.module';
import {CoreModule} from './core/core.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    CoreModule.forServer()
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
