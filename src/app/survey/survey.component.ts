import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import {MatCard} from '@angular/material';
import { ApiService } from '../api.service';
import { ChildrenOutletContexts } from '@angular/router';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private apiservice: ApiService, public fb: FormBuilder) { }

  /*############ Registration Form ############*/
  // surveyForm = this.fb.group({
  //   addDynamicElement: this.fb.array([])
  // });

  surveyForm = this.fb.group({
    pname: [''],
    pge: [''],
    padhr: ['']
   });

  // Submit Registration Form
  onSubmit() {
    alert(JSON.stringify(this.surveyForm.value));
  }

  //children = [{cname: '', cge: ''}];
  // noChild = 0;
  // peopleData = {
  //   pname: '',
  //   pge: '',
  //   padhr: '',
  //   children: [
  //     {cname: '', cge: ''}
  //   ]
  //   };



  ngOnInit() {

  }

  // onSubmit(data: NgForm) {
  //   this.apiservice.savePeople(data.value).subscribe(() => {
  //   alert('Student successfully added into database!');
  //   });
  // }

  // onAddChild() {
  //   // const child = {
  //   //   cname: '',
  //   //   cge: '',
  //   //   };
  //   //this.childAge = this.peopleData.children[0].cname;
  //   this.peopleData.children.push({
  //       cname: '',
  //        cge: '',
  //        });
  //        //console.log(this.peopleData.children);

  // }
}
