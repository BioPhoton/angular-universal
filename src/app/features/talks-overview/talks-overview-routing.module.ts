import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TalksListComponent} from './talks-list/talks-list.component';

const routes: Routes = [
  { path: '', component: TalksListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalksOverviewRoutingModule {

}
