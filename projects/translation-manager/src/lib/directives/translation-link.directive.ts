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
import {filter, takeUntil} from 'rxjs/internal/operators';
import {TranslationManagerService} from '../services/translation-manager.service';


@Directive({
  // we need <a> element because of SEO reasons
  selector: 'a[translationLink]'
})
export class TranslationLinkDirective implements OnChanges, OnDestroy {
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

    this.router.events
      .pipe(
        filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.onDestroy$)
      )
      .subscribe((_) => {
        this.updateTargetUrlAndHref();
      });
  }

  @Input()
  set translationLink(lang: string) {
    const externalUrl = this.translationManagerService.getExternalUrl(this.urlTree)
    const newCommands: string[] = this.translationManagerService.getExternalUrlWithoutLang(externalUrl).split('/');
    const newLang = this.translationManagerService.isValidLang(lang) ? lang : this.translationManagerService.getDefaultLang();
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

  get currentLang(): string {
    return this.commands[0];
  }

}
