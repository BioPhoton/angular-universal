import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslationManagerModule} from '../../../../../translation-manager/src/public_api';
import {LayoutComponent} from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslationManagerModule.forFeature()
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
