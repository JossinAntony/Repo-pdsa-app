import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Person } from '../person.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as $ from 'jquery';

//import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare var jsPDF: any;

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

  margins = {
    top: 40,
    bottom: 60,
    left: 40,
    width: 522
  };
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
        alert('No matching entires found!');
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





  printPdf() {
    // loop first table
    $('#ident tr').each(function () {
      // get the name
      var name = $(this).find('td:first').text(),
        // search the name in the second table
        tbl2row = $("#second td").filter(function () {
          return $(this).text() == name;
        }).closest("tr");

      // if the name doesn't exist in the second table
      if (tbl2row.length == 0) {
        // clone the row and add it to the result table
        $(this).clone().appendTo('.result');
      }
    });

    // loop the second table
    $('#casuality tr').each(function () {
      var name = $(this).find('td:first').text(),
        resRow = $(".result td").filter(function () {
          return $(this).text() == name;
        }).closest("tr");

      $(this).clone().appendTo('.result');
    });

    // loop the third table
    $('#asset tr').each(function () {
      var name = $(this).find('td:first').text(),
        resRow = $(".result td").filter(function () {
          return $(this).text() == name;
        }).closest("tr");

      $(this).clone().appendTo('.result');
    });

    // loop the fourth table
    $('#vehicle tr').each(function () {
      var name = $(this).find('td:first').text(),
        resRow = $(".result td").filter(function () {
          return $(this).text() == name;
        }).closest("tr");

      $(this).clone().appendTo('.result');
    });


    // loop the fifth table
    $('#comments tr').each(function () {
      var name = $(this).find('td:first').text(),
        resRow = $(".result td").filter(function () {
          return $(this).text() == name;
        }).closest("tr");

      $(this).clone().appendTo('.result');

    });
  }



  downloadPDF() {

    // let columns = ["ID", "Name", "Country"];
    // let rows = [
    //     [1, "Shaw", "Tanzania"],
    //     [2, "Nelson", "Kazakhstan"],
    //     [3, "Garcia", "Madagascar"],
    // ];

    // let doc = new jsPDF('p', 'mm', 'a4');
    // //doc.autoTable(columns, rows); // typescript compile time error
    // doc.autoTable({html: '#toPdf'});
    // doc.save('table.pdf');
    // }

    var doc = new jsPDF('p', 'pt', 'A4');

    var header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text("Survey Report", data.settings.margin.left, 50);
  };

    var res = doc.autoTableHtmlToJson(document.getElementById('ident'));
    doc.autoTable(res.columns, res.data,  {margin: {top: 80}, beforePageContent: header});
    var res2 = doc.autoTableHtmlToJson(document.getElementById('casuality'));
    doc.autoTable(res2.columns, res2.data, {
        startY: doc.lastAutoTable.finalY + 50
    });
   var res3 = doc.autoTableHtmlToJson(document.getElementById('asset'));
    doc.autoTable(res3.columns, res3.data, {
        startY: doc.lastAutoTable.finalY + 50
    });

    var res4 = doc.autoTableHtmlToJson(document.getElementById('vehicle'));
    doc.autoTable(res4.columns, res4.data, {
        startY: doc.lastAutoTable.finalY + 50
    });
    doc.save("test.pdf");
  }
}
