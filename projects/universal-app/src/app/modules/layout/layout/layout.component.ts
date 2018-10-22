import {Component} from '@angular/core';
import {AppStateService} from '../../../core/services/app-state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  title = 'angular-universal';

  constructor(
    private aS: AppStateService,
  ) {
    this.title = this.aS.title;
  }

}
