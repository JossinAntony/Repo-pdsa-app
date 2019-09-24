import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  savePeople(data) {
    // return this.http.post('http://localhost:3052/savePeopleAPI', data);
    return this.http.post('https://pdsa-apis.herokuapp.com/savePeopleAPI', data);
  }

  retrievePeople() {
    // return this.http.get('http://localhost:3052/retrievePeopleAPI');
    return this.http.get('https://pdsa-apis.herokuapp.com/retrievePeopleAPI');
  }

  retrievePersonByName(data) {
    // return this.http.post('http://localhost:3052/retrievePersonByNameAPI', data);
    return this.http.post('https://pdsa-apis.herokuapp.com/retrievePersonByNameAPI', data);
  }

  deletePersonById(data) {
    // return this.http.post('http://localhost:3052/deletePersonAPI', data);
    return this.http.post('https://pdsa-apis.herokuapp.com/deletePersonAPI', data);
  }
}
