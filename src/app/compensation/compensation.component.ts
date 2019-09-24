import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css']
})
export class CompensationComponent implements OnInit {

  person: any;
  dCount = 0;
  iCount = 0;
  aCount = 0;
  arrLength = 0;


  constructor(private apiservice: ApiService) { }

  ngOnInit() {
  }

  onSubmit(data: NgForm) {

    this.apiservice.retrievePersonByName(data.value).subscribe((response: Array<any>) => {
      if (response.length > 0) {
        this.dCount = 0;
        this.person = response[0];

        for (let i = 0; i < this.person.casualities.length; i++) {
          if (this.person.casualities[i].casStatus === 'deceased') {
            this.dCount = this.dCount + 1;
          }
          if (this.person.casualities[i].casStatus === 'injured') {
            this.iCount = this.iCount + 1;
          }
        }

        for (let i = 0; i < this.person.assets.length; i++) {
          if (this.person.assets[i].astStatus === 'total') {
            this.aCount = this.aCount + 1;
          }

        }
        console.log(this.dCount, this.iCount, this.aCount);

      } else {
        alert('No matching entires found!');

      }
    });
  }

}
