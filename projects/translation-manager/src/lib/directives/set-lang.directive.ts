import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  UrlTree
} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {TranslationManagerService} from '../services/translation-manager.service';
import {takeUntil} from 'rxjs/internal/operators';


@Directive({
  selector: 'a[setLang]'
})
export class SetLangDirective implements OnChanges, OnDestroy {
  private commands: any[] = [];
  private onDestroySubject: Subject<boolean> = new Subject();
  private onDestroy$: Observable<boolean> = this.onDestroySubject.asObservable();

  // the url displayed on the anchor element used for SSR or clients without JS.
  @HostBinding() href: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translationManagerService: TranslationManagerService
  ) {
    router.events
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((s: RouterEvent) => {
      if (s instanceof NavigationEnd) {
        this.updateTargetUrlAndHref();
      }
    });
  }

  @Input()
  set setLang(lang: string) {
    const newCommands: string[] = this.translationManagerService
      .getExternalUrlWithoutLang(this.translationManagerService.getExternalUrl(this.urlTree)).split('/');
    const newLang = lang != null ? lang : this.translationManagerService.getDefaultLang();
    this.commands = [newLang, ...newCommands];
  }

  ngOnChanges(changes: {}): any {
    this.updateTargetUrlAndHref();
  }

  ngOnDestroy(): any {
    this.onDestroySubject.next(true);
  }

  @HostListener('click', ['$event'])
  onClick($event): boolean {
    // prevent event if js is enabled (for client side)
    $event.stopPropagation();
    $event.preventDefault();

    this.router.navigateByUrl(this.urlTree)
      .catch((e) => {
        console.error('Error in translation service on', e);
      });

    return false;
  }

  private updateTargetUrlAndHref(): void {
      this.href = this.translationManagerService.getExternalUrl(this.urlTree);
  }

  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      // parent because we want to skip the lang segment
      relativeTo: this.route.parent
    });
  }

}

function attrBoolValue(s: any): boolean {
  return s === '' || !!s;
}
