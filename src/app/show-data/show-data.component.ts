import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  personData: any;
  showPerson: any;
  personFound = false;
  personDisplay = false;
  pname: any;

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.personFound = false;
    this.personDisplay = false;
  }

  onSubmit(data: NgForm) {
    this.apiservice.retrievePersonByName(data.value).subscribe((response: Array<object>) => {
      if (response.length > 0) {
      this.personData = response;
      this.personFound = true;
      this.personDisplay = false;
      // console.log(this.personData);
      } else {
        alert( 'No matching entires found!');
        this.personFound = false;
      }
    });
  }

  view(i) {
    this.showPerson = this.personData[i];
    console.log(this.showPerson);
    this.personFound = false;
    this.personDisplay = true;
  }
}
