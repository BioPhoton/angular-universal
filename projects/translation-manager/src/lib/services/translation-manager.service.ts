import {LocationStrategy} from '@angular/common';
import {Injectable, OnDestroy} from '@angular/core';
import {NavigationEnd, Router, RouterEvent, UrlTree} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

@Injectable()
export class TranslationManagerService implements OnDestroy {

  onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private router: Router,
    private locationStrategy: LocationStrategy,
    private translateService: TranslateService
  ) {

    this.router.events
      .pipe(
        filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
        map(e => e.url.split('/')[1]),
        takeUntil(this.onDestroy$)
      )
      .subscribe((lang: string) => {
      this.switchLang(lang);
    });
  }

  getDefaultLang(): string {
    return this.translateService.getDefaultLang();
  }

  setDefaultLang(lang: string): void {
    this.translateService.setDefaultLang(lang);
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
