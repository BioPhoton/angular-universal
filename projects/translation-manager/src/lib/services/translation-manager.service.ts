import {LocationStrategy} from '@angular/common';
import {Inject, Injectable, OnDestroy} from '@angular/core';
import {NavigationEnd, Router, RouterEvent, UrlTree} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {TRANSLATION_MANAGER_CONFIG_TOKEN} from '../tokens/translatio-manager-config.token';

@Injectable()
export class TranslationManagerService implements OnDestroy {

  onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(
    private router: Router,
    private locationStrategy: LocationStrategy,
    private translateService: TranslateService,
    @Inject(TRANSLATION_MANAGER_CONFIG_TOKEN) private translationManagerConfig
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
    if (this.isValidLang(lang)) {
      this.translateService.setDefaultLang(lang);
    } else {
      this.translateService.setDefaultLang(this.translationManagerConfig.defaultLang);
    }
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

  isValidLang(lang: string): boolean {
    return this.translationManagerConfig.indexOf(lang) !== -1;
  }

  switchLang(lang: string) {
    if (this.isValidLang(lang)) {
      this.translateService.use(lang);
    } else {
      this.translateService.use(this.getDefaultLang());
    }

  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }

}
