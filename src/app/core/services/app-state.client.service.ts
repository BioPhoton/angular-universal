import { Injectable } from '@angular/core';
import {AppStateService} from './app-state.service';

@Injectable()
export class AppStateClientService extends AppStateService {

  constructor() {
    super();
    this.title = 'Client Title';
  }
}
