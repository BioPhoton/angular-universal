import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../../core/services/app-state.service';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-talks-list',
  templateUrl: './talks-list.component.html',
  styleUrls: ['./talks-list.component.css']
})
export class TalksListComponent implements OnInit {

  talk$: Observable<any> = this.aS.getFlightById('1');
  constructor(private aS: AppStateService) { }

  ngOnInit() {
  }

}
