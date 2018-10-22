import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../../core/api/api.service';

@Component({
  selector: 'app-talks-list',
  templateUrl: './talks-list.component.html',
  styleUrls: ['./talks-list.component.css']
})
export class TalksListComponent implements OnInit {

  talk$: Observable<any> = this.aS.getFlightById('1');
  constructor(private aS: ApiService) { }

  ngOnInit() {
  }

}
