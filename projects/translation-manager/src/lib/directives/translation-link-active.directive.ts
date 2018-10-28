import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {TranslationLinkDirective} from '../directives/translation-link.directive';
import {TranslationManagerService} from '../services/translation-manager.service';

@Directive({
  selector: 'a[translationLinkActive]'
})
export class TranslationLinkActiveDirective implements OnChanges,
  OnDestroy, AfterContentInit {

  @ContentChildren(TranslationLinkDirective, {descendants: true})
  links: QueryList<TranslationLinkDirective>;

  private onDestroySubject: Subject<boolean> = new Subject();
  private onDestroy$: Observable<boolean> = this.onDestroySubject.asObservable();
  private classes: string[] = [];

  constructor(
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer2,
    private translationManagerService: TranslationManagerService
  ) {
    router.events
      .pipe(
        filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.onDestroy$)
      )
      .subscribe(_ => {
        this.update();
      });
  }

  ngAfterContentInit(): void {
    this.links.changes
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(_ => this.update());
    this.update();
  }

  @Input()
  set translationLinkActive(data: string[] | string) {
    const classes = Array.isArray(data) ? data : data.split(' ');
    this.classes = classes.filter(c => !!c);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }

  private update(): void {
    if (!this.links || !this.router.navigated) {
      return;
    }
    const hasActiveLinks = this.hasActiveLanguages();
    this.classes
      .forEach((c) => {
        if (hasActiveLinks) {
          this.renderer.addClass(this.element.nativeElement, c);
        } else {
          this.renderer.removeClass(this.element.nativeElement, c);
        }
      });
  }

  private hasActiveLanguages(): boolean {
    return this.links.toArray()
      .map(l => l.currentLang)
      .some((lang: string) => {
        return this.translationManagerService.currentLang === lang;
      });
  }
}
