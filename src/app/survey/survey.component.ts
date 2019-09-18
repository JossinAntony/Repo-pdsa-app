import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormArray, FormGroup } from '@angular/forms';
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

  public surveyForm: FormGroup;
  public children: Array<{}>;



  ngOnInit() {
    this.surveyForm = this.fb.group({
      sname: [''],
      sdesig: [''],
      sdate: [''],

      pname: [''],
      pge: [''],
      padhr: [''],
      phname: [''],
      pward: [''],
      ppnchyth: [''],
      pthlk: [''],
      pdstrct: [''],

      pmob: [''],
      pmail: [''],


      children: this.fb.array([
        this.fb.group({
          cname: [''],
          cge: ['']
        })])
     });
    this.removeFormControl(0);
  }



  addChildren() {
    let childrenArray = this.surveyForm.controls.children as FormArray;
    let arraylen = childrenArray.length;

    let newChildrengroup: FormGroup = this.fb.group({
      cname: [''],
      cge: ['']
    });

    childrenArray.insert(arraylen, newChildrengroup);
  }

  removeFormControl(i) {
    let childrenArray = this.surveyForm.controls.children as FormArray;
    childrenArray.removeAt(i);
  }

  // onSubmit() {
  //   alert(JSON.stringify(this.surveyForm.value));
  //   console.log(this.surveyForm);
  // }

  onSubmit(data: NgForm) {
    this.apiservice.savePeople(this.surveyForm.value).subscribe(() => {
    alert('Student successfully added into database!');
    });
  }

}
