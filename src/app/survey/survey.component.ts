import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatCard} from '@angular/material';
import { ApiService } from '../api.service';
import { ChildrenOutletContexts } from '@angular/router';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  //children = [{cname: '', cge: ''}];
  noChild = 0;
  peopleData = {
    pname: '',
    pge: '',
    padhr: '',
    children: [
      {cname: '', cge: ''}
    ]
    };



  json = {};
  child: {cname: '', cge: ''};
  child1: {cname: '', cge: ''};
  children = new Array();

  ngOnInit() {

  }

  onSubmit(data: NgForm) {
  console.log(data.value);
  this.child = {
    cname: data.value.children[0].cname,
    cge: data.value.children[0].cge
  };

  this.child1 = {
    cname: data.value.children[1].cname,
    cge: data.value.children[1].cge
  };

  this.children.push(this.child);
  this.children.push(this.child1);

  this.json = {
    pname: data.value.pname,
    pge: data.value.pge,
    padhr: data.value.padhr,
    children: this.children
  };


  this.apiservice.savePeople(this.json).subscribe(() => {
  alert('Student successfully added into database!');
  // console.log(this.peopleData);
  console.log(data.value);
    }
    );
  }

  onAddChild() {

    // const child = {
    //   cname: '',
    //   cge: '',
    //   };
    //this.childAge = this.peopleData.children[0].cname;
    this.peopleData.children.push({
        cname: '',
         cge: '',
         });
         //console.log(this.peopleData.children);

  }
}
