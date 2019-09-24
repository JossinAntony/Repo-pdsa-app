import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatButton} from '@angular/material';

@Component({
  selector: 'app-show-statistics',
  templateUrl: './show-statistics.component.html',
  styleUrls: ['./show-statistics.component.css']
})
export class ShowStatisticsComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  titleCasualities = 'No. of Casualities';
  titleAssets = 'Damage to Assets';


  type = 'ColumnChart';
  data = [
    ["2012", 900, 390, 180],
    ["2012", 900, 390, 180],
    ["2013", 1000, 400, 180],
    ["2014", 1170, 440, 180],
    ["2015", 1250, 480, 180],
    ["2016", 1530, 540, 180]
  ];
  columnNamesCasualities = ['Disaster code', 'Injured', 'Deceased', 'Missing'];
  columnNamesAssets = ['Disaster code', 'Mild', 'Total'];

  options = {};
  width = 1000;
  height = 250;

  Data: any;
  arraylength: any;
  arr = [];
  dataCasualities = [];
  dataAssets = [];

  dCount = 0;
  iCount = 0;
  mCount = 0;

  amCount = 0;
  atCount = 0;
  status = false;

  ngOnInit() {
    this.status = false;
    this.apiservice.retrievePeople().subscribe((response: Array<object>) => {
      if (response.length > 0) {
        this.Data = response;
        this.arraylength = response.length;

        for (let i = 0; i < this.arraylength; i++) {
          this.arr.push(this.Data[i].dcode);
        }
        const disasterCodes = new Set(this.arr);

        // -------------data extraction-casualities-----------
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
        // --------------------------------------------------------------------------





        // -------------data extraction-assets-----------
        for (let entry of disasterCodes) {
          this.amCount = 0;
          this.atCount = 0;


          let arr = [];
          arr.push(entry);
          for (let i = 0; i < this.arraylength; i++) {
            if (this.Data[i].dcode === entry) {
              for (let j = 0; j < this.Data[i].assets.length; j++) {
                if (this.Data[i].assets[j].astStatus === 'mild') {
                  this.amCount = this.amCount + 1;
                }
                if (this.Data[i].assets[j].astStatus === 'total') {
                  this.atCount = this.atCount + 1;
                }
              }
            }
          }
          arr.push(this.amCount);
          arr.push(this.atCount);

          this.dataAssets.push(arr);
        }
        // --------------------------------------------------------------------------
      } else {
        alert('No entires found!');
      }
    });
  }


  showStatistics() {
    this.status = true;
    this.apiservice.retrievePeople().subscribe((response: Array<object>) => {
      if (response.length > 0) {
        this.Data = response;
        this.arraylength = response.length;

        for (let i = 0; i < this.arraylength; i++) {
          this.arr.push(this.Data[i].dcode);
        }
        const disasterCodes = new Set(this.arr);

        // -------------data extraction-casualities-----------
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
        // --------------------------------------------------------------------------





        // -------------data extraction-assets-----------
        for (let entry of disasterCodes) {
          this.amCount = 0;
          this.atCount = 0;


          let arr = [];
          arr.push(entry);
          for (let i = 0; i < this.arraylength; i++) {
            if (this.Data[i].dcode === entry) {
              for (let j = 0; j < this.Data[i].assets.length; j++) {
                if (this.Data[i].assets[j].astStatus === 'mild') {
                  this.amCount = this.amCount + 1;
                }
                if (this.Data[i].assets[j].astStatus === 'total') {
                  this.atCount = this.atCount + 1;
                }
              }
            }
          }
          arr.push(this.amCount);
          arr.push(this.atCount);

          this.dataAssets.push(arr);
        }
        // --------------------------------------------------------------------------
      } else {
        alert('No entires found!');
      }
    });

  }
}

