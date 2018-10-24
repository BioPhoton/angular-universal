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
import {Subscription} from 'rxjs';
import {TranslationManagerService} from '../services/translation-manager.service';


@Directive({
  selector: 'a[setLang]'
})
export class SetLangDirective implements OnChanges, OnDestroy {
  private commands: any[] = [];
  private subscription: Subscription;

  // the url displayed on the anchor element.
  @HostBinding() href: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translationManagerService: TranslationManagerService
  ) {
    this.subscription = router.events.subscribe((s: RouterEvent) => {
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
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onClick($event): boolean {
    // prevent event if js is enables (for client side)
    $event.stopPropagation();
    $event.preventDefault();

    this.router.navigateByUrl(this.urlTree);

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
