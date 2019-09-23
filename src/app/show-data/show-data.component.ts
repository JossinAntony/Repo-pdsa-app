import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Person } from '../person.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as $ from 'jquery';


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



  // captureScreen() {
  //   var htmlWidth = $('#toPdf').width();
  //   var htmlHeight = $('#toPdf').height();
  //   // var top_left_margin = 15;
  //   var top_left_margin = 100;
  //   var PDF_Width = htmlWidth + (top_left_margin * 2);
  //   var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
  //   // var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
  //   var PDF_Height = (PDF_Width * 1) + (top_left_margin * 1);
  //   var canvas_image_width = htmlWidth;
  //   var canvas_image_height = htmlHeight;

  //   var totalPDFPages = Math.ceil(htmlHeight / PDF_Height) - 1;


  //   html2canvas($('#toPdf')[0], { allowTaint: true }).then(function (canvas) {
  //     canvas.getContext('2d');

  //     console.log(canvas.height + '  ' + canvas.width);


  //     var imgData = canvas.toDataURL('image/jpeg', 1.0);
  //     var pdf = new jspdf('p', 'pt', [PDF_Width, PDF_Height]);

  //     pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


  //     for (var i = 1; i <= totalPDFPages; i++) {
  //       pdf.addPage(PDF_Width, PDF_Height);
  //       //pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
  //     }

  //     pdf.save('Report.pdf');
  //   });
  // }

  captureScreen() {
  var pdf = new jspdf('p','pt','a4');
pdf.addHTML($("#first").get(0),function() {
    pdf.save('web.pdf');
});
  }

  merge(){
    $(function() {
      // loop first table
      $('#first tr').each( function() {
        // get the name
        var name = $(this).find('td:first').text(),
            // search the name in the second table
            tbl2row = $("#second td").filter(function() {
              return $(this).text() == name;
            }).closest("tr");

        // if the name doesn't exist in the second table
        if( tbl2row.length == 0 ) {
          // clone the row and add it to the result table
          $(this).clone().appendTo('.result');
        }
        // the row exists in the second table
        else {
          // clone the row
          var clone = $(this).clone();
          // loop the cells, get the values and add the sum to the clone
          clone.find('td:not(:first)').each( function() {
            var i = $(this).index(),
                num = parseFloat($(this).text()),
                num2 = parseFloat(tbl2row.find('td:eq('+i+')').text());
            $(this).text( num+num2);
          });
          // add the clone to the new table
          clone.appendTo('.result');
        }
      });

      // loop the second table
      $('#second tr').each( function() {
        var name = $(this).find('td:first').text(),
            resRow = $(".result td").filter(function() {
              return $(this).text() == name;
            }).closest("tr");

        // if the name doesn't exist, add the row
        if( resRow.length == 0 ) {
          $(this).clone().appendTo('.result');
        }
      });
    });
  }
}



