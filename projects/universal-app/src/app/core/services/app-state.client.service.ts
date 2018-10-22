import { Injectable } from '@angular/core';
import {AppStateService} from './app-state.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppStateClientService {
  title: string;

  constructor() {
    this.title = 'Client Title';
  }
}
