import { Injectable } from '@angular/core';
import {AppStateService} from './app-state.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppStateServerService extends AppStateService {

  constructor(http: HttpClient) {
    super(http);
    this.title = 'Server Title';
  }

}
