import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterModule} from '@angular/router';
import {TranslationManagerModule} from '@universal-workspace/translation-manager/*';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslationManagerModule.forRoot({defaultLang: 'en', languages: ['en', 'de']}),
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
