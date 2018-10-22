import { Component, OnInit } from '@angular/core';
import {TranslationManagerService} from '../../translation-manager/services/translation-manager.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               private translationManagerService: TranslationManagerService
  ) {

  }

  ngOnInit() {
  }

}
