import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TalksListComponent} from './talks-list/talks-list.component';

import {TalksOverviewRoutingModule} from './talks-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TalksOverviewRoutingModule
  ],
  declarations: [TalksListComponent]
})
export class TalksOverviewModule { }
