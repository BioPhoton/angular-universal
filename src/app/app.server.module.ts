import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CoreModule.forServer()
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
