import {Component} from '@angular/core';
import {AppStateService} from './core/services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-universal';

  constructor(
    private aS: AppStateService
  ) {
    this.title = this.aS.title;
  }

}
