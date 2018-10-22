import {LocationStrategy} from '@angular/common';
import {Injectable, OnDestroy} from '@angular/core';
import {
  ActivatedRoute, NavigationEnd, Router, RouterEvent,
  UrlTree
} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/index';
import {pluck, takeUntil, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationManagerService implements OnDestroy {

  onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private translateService: TranslateService
  ) {

    // @TODO get url param changes and on change set lang
   this.route.params
      .pipe(
        pluck('lang'),
        takeUntil(this.onDestroy$)
      )
      .subscribe(
        (lang: string) => this.switchLang(lang)
      );
  }

  getDefaultLang(): string {
    return this.translateService.getDefaultLang();
  }

  getExternalUrl(urlTree: UrlTree): string {
    return this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(urlTree));
  }

  getExternalUrlWithoutLang(url: string): string {
    const newCommands = url.split('/');
    newCommands.shift();
    newCommands.shift();
    return newCommands.join('/');
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }

}
