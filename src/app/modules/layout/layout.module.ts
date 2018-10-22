import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterModule} from '@angular/router';
import {TranslationManagerModule} from '../translation-manager/translation-manager.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslationManagerModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
