import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalksOverviewRoutingModule } from './talks-overview-routing.module';
import { TalksListComponent } from './talks-list/talks-list.component';

@NgModule({
  imports: [
    CommonModule,
    TalksOverviewRoutingModule
  ],
  declarations: [TalksListComponent]
})
export class TalksOverviewModule { }
