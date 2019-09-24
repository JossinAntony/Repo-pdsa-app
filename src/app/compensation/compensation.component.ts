import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as $ from 'jquery';

// import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare var jsPDF: any;

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
  aArea = 0;
  name: any;
  dCode: any;


  amtDeceased = 0;
  amtInjured = 0;
  amtAssets = 0;

  cDeceased = 0;
  cInjured = 0;
  cAssets = 0;
  total = 0;
  status = false;


  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.status = false;
    this.name = '';
    this.dCode = '';
  }

  onSubmit(data: NgForm) {

    this.apiservice.retrievePersonByName(data.value).subscribe((response: Array<any>) => {
      if (response.length > 0) {
        this.dCount = 0;
        this.iCount = 0;
        this.aCount = 0;
        this.aArea = 0;
        this.total = 0;

        this.amtDeceased = 0;
        this.amtInjured = 0;
        this. amtAssets = 0;
        this.person = response[0];

        this.cDeceased = data.value.cDeceased;
        this.cInjured = data.value.cInjured;
        this.cAssets = data.value.cAssets;
        this.name = data.value.pname;
        this.dCode = this.person.dcode;
// -----------Data extraction from person-----------------
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
           // this.aCount = this.aCount + 1;
            this.aArea = Number(Number(this.aArea) + Number(this.person.assets[i].astArea));
          }
        }
// ----------------------------------------------------------
        this.amtDeceased = this.cDeceased * this.dCount;
        this.amtInjured = this.cInjured * this.iCount;
        this.amtAssets= this.cAssets * this.aArea;

        this.status = true;
        this.total = this.amtDeceased + this.amtInjured + this.amtAssets;

        //console.log(this.amtDeceased, this.amtInjured, this.amtAssets);

      } else {
        alert('No matching entires found!');

      }
    });
  }

  downloadPDF() {
    var doc = new jsPDF('p', 'pt', 'A4');

    var header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text("Compensation Report", data.settings.margin.left, 50);
  };

    var res = doc.autoTableHtmlToJson(document.getElementById('table'));
    doc.autoTable(res.columns, res.data,  {margin: {top: 80}, beforePageContent: header});


    doc.save("Compensation report.pdf");
  }

}
