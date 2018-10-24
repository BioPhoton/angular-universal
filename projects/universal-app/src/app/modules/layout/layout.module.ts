import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslationManagerModule} from '@universal-workspace/translation-manager';
import {LayoutComponent} from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslationManagerModule.forRoot({defaultLang: 'en', languages: ['en', 'de']})
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
