import {Routes} from '@angular/router';
import {Error404Component} from './core/components/error404/error404.component';
import {HomeComponent} from './core/components/home/home.component';
import {SpeakerOverviewModule} from './features/speaker-overview/speaker-overview.module';

export const ROUTES: Routes = [
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

export const STATIC_ROUTES_FOR_PRERENDER: string[] = [
  '/home',
  '/talks-overview',
  '/error404'
];

