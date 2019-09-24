import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  savePeople(data) {
    return this.http.post('https://localhost:3052/savePeopleAPI', data);
  }

  retrievePeople() {
    return this.http.get('https://localhost:3052/retrievePeopleAPI');
  }

  retrievePersonByName(data) {
    return this.http.post('https://localhost:3052/retrievePersonByNameAPI', data);
  }

  deletePersonById(data) {
    return this.http.post('https://localhost:3052/deletePersonAPI', data);
  }
}
