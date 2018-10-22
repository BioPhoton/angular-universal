import {Injectable} from '@angular/core';

@Injectable()
export class AppStateServerService {
  title: string;

  constructor() {
    this.title = 'Server Title';
  }

}
