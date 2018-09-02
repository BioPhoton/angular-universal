import { Injectable } from '@angular/core';
import {AppStateService} from './app-state.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppStateClientService extends AppStateService {

  constructor(http: HttpClient) {
    super(http);
    this.title = 'Client Title';
  }
}
