import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-show-statistics',
  templateUrl: './show-statistics.component.html',
  styleUrls: ['./show-statistics.component.css']
})
export class ShowStatisticsComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  title = 'No. of Casualities';
  type = 'ColumnChart';
  data = [
    ["2012", 900, 390, 180],
    ["2012", 900, 390, 180],
    ["2013", 1000, 400, 180],
    ["2014", 1170, 440, 180],
    ["2015", 1250, 480, 180],
    ["2016", 1530, 540, 180]
  ];
  columnNames = ['Disaster code', 'Injured', 'Deceased',  'Missing'];
  options = {};
  width = 550;
  height = 200;

  Data: any;
  arraylength: any;
  arr = [];
  dataCasualities = [];
  dCount = 0;
  iCount = 0;
  mCount = 0;

  ngOnInit() {
    this.apiservice.retrievePeople().subscribe((response: Array<object>) => {
      if (response.length > 0) {
        this.Data = response;
        this.arraylength = response.length;

        for (let i = 0; i < this.arraylength; i++) {
          this.arr.push(this.Data[i].dcode);
        }
        const disasterCodes = new Set(this.arr);


        for (let entry of disasterCodes) {
          this.dCount = 0;
          this.iCount = 0;
          this.mCount = 0;

          let arr = [];
          arr.push(entry);
          for (let i = 0; i < this.arraylength; i++) {
             if (this.Data[i].dcode === entry) {
               for (let j = 0; j < this.Data[i].casualities.length; j++) {
                 if (this.Data[i].casualities[j].casStatus === 'deceased') {
                   this.dCount = this.dCount + 1;
                 }
                 if (this.Data[i].casualities[j].casStatus === 'injured') {
                  this.iCount = this.iCount + 1;
                }
                if (this.Data[i].casualities[j].casStatus === 'missing') {
                  this.mCount = this.mCount + 1;
                }
               }
             }
          }
           arr.push(this.iCount);
           arr.push(this.dCount);
          arr.push(this.mCount);

          this.dataCasualities.push(arr);
        }
        console.log(this.dataCasualities);


      } else {
        alert('No entires found!');
      }
    });
  }
}

