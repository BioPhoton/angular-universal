import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from './components/error404/error404.component';
import {HomeComponent} from './components/home/home.component';
import {SpeakerOverviewModule} from './features/speaker-overview/speaker-overview.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'speaker-overview',
    children: [...SpeakerOverviewModule.getRoutes()]
  },
  {
    path: 'talks-overview',
    loadChildren: './features/talks-overview/talks-overview.module#TalksOverviewModule'
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [
    SpeakerOverviewModule,
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRouterModule {

}
