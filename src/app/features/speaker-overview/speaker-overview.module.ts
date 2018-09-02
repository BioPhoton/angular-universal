import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {SpeakerListComponent} from './speaker-list/speaker-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpeakerListComponent]
})
export class SpeakerOverviewModule {

  static getRoutes(): Routes {
    return [
      {
        path: '',
        component: SpeakerListComponent
      }
    ];
  }
}
