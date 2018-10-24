import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getFlightById(id: string) {
    const url = 'http://www.angular.at/api/flight/find';
    const params = {id};
    const options = {params};
    return this.http.get(url, options);
  }

}
