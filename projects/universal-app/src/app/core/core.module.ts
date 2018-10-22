import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {AppStateClientService} from './services/app-state.client.service';
import {AppStateService} from './services/app-state.service';
import {AppStateServerService} from './services/app-state.server.service';
import {HttpClientModule} from '@angular/common/http';
import {Error404Component} from './components/error404/error404.component';
import {HomeComponent} from './components/home/home.component';

export const DECLARATIONS = [
  HomeComponent,
  Error404Component
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    DECLARATIONS
  ]
})
export class CoreModule {
  static forServer(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: AppStateService,
          useClass: AppStateServerService
        }
      ]
    };
  }

  static forClient(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: AppStateService,
          useClass: AppStateClientService
        }
      ]
    };
  }
}
