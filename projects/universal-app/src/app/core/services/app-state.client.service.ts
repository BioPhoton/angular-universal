import {Injectable} from '@angular/core';

@Injectable()
export class AppStateClientService {
  title: string;

  constructor() {
    this.title = 'Client Title';
  }
}
