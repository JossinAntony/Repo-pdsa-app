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

  personData: Array<any>;
  showPerson: Array<any>;
  personFound = false;
  personDisplay = false;
  pname: any;

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
  }

  onSubmit(data: NgForm) {
    this.apiservice.retrievePersonByName(data.value).subscribe((response: Array<object>) => {
      if (response.length > 0) {
      this.personData = response;
      this.personFound = true;
      console.log(this.personData);
      } else {
        alert( 'No matching entires found!');
        this.personFound = false;
      }
    });
  }

  view(i) {
    this.showPerson = this.personData[i];
    // this.personFound = false;
    // this.personDisplay = true;
  }
}
