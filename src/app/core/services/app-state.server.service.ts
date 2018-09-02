import { Injectable } from '@angular/core';
import {AppStateService} from './app-state.service';

@Injectable()
export class AppStateServerService extends AppStateService {

  constructor() {
    super();
    this.title = 'Server Title';
  }

}
