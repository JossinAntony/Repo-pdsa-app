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
  public users: Array<{}>;



  ngOnInit() {
    this.surveyForm = this.fb.group({
      pname: [''],
      pge: [''],
      padhr: [''],
      users: this.fb.array([
        this.fb.group({
          cname: [''],
          cge: ['']
        })])
     });
    this.removeFormControl(0);
  }



  addChildren() {
    let usersArray = this.surveyForm.controls.users as FormArray;
    let arraylen = usersArray.length;

    let newUsergroup: FormGroup = this.fb.group({
      cname: [''],
      cge: ['']
    });

    usersArray.insert(arraylen, newUsergroup);
  }

  removeFormControl(i) {
    let usersArray = this.surveyForm.controls.users as FormArray;
    usersArray.removeAt(i);
  }

  onSubmit() {
    alert(JSON.stringify(this.surveyForm.value));
    console.log(this.surveyForm);
  }

  // onSubmit(data: NgForm) {
  //   this.apiservice.savePeople(data.value).subscribe(() => {
  //   alert('Student successfully added into database!');
  //   });
  // }

}
