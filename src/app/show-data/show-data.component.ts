import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Person } from '../person.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as rasterizeHTML from 'rasterizehtml';

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

  captureScreen(){
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
}
