import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppStateService} from './core/services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-universal';

  constructor(
    private aS: AppStateService,
    private translateService: TranslateService
  ) {
    this.title = this.aS.title;

    this.translateService.setDefaultLang('en');
    this.translateService.use('de');
  }

  setLang(lang: string): void {
    this.translateService.use(lang);
  }

}
