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
import {QueryParamsHandling} from '@angular/router/src/config';
import {Subscription} from 'rxjs';
import {TranslationManagerService} from '../services/translation-manager.service';

/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */

@Directive({
  selector: 'a[setLang]'
})

export class SetLangDirective implements OnChanges, OnDestroy {

  @HostBinding('attr.target') @Input() target: string;
  @Input() queryParams: { [k: string]: any };
  @Input() fragment: string;
  @Input() queryParamsHandling: QueryParamsHandling;
  @Input() preserveFragment: boolean;
  @Input() skipLocationChange: boolean;
  @Input() replaceUrl: boolean;
  private commands: any[] = [];
  private subscription: Subscription;
  private preserve: boolean;

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
  set appSetLang(lang: string) {
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

  @HostListener('click', ['$event', '$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'])
  onClick($event: any, button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean {
    // @TODO check if necessary!
    $event.stopPropagation();
    $event.preventDefault();

    if (button !== 0 || ctrlKey || metaKey || shiftKey) {
      return true;
    }

    if (typeof this.target === 'string' && this.target !== '_self') {
      return true;
    }

    const extras = {
      skipLocationChange: attrBoolValue(this.skipLocationChange),
      replaceUrl: attrBoolValue(this.replaceUrl),
    };
    this.router.navigateByUrl(this.urlTree, extras);

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
