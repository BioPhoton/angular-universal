import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {ApiService} from '../../../core/api/api.service';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.css']
})
export class SpeakerListComponent implements OnInit {

  talk$: Observable<any> = this.aS.getFlightById('1');

  constructor(private aS: ApiService) { }

  ngOnInit() {
  }

}
