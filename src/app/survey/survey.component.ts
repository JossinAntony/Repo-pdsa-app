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
  /*############ Registration Form ############*/
  // surveyForm = this.fb.group({
  //   addDynamicElement: this.fb.array([])
  // });



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
    this.surveyForm = this.fb.group({
      pname: [''],
      pge: [''],
      padhr: [''],
      users: this.fb.array([
        this.fb.group({
          cname: ['']
        })])
     });
  }


  get addDynamicElement() {
    return this.surveyForm.get('addDynamicElement') as FormArray
  }

  // addChildren() {
  //   this.addDynamicElement.push(this.fb.control(''))
  // }

  addChildren() {
    let usersArray = this.surveyForm.controls.users as FormArray;
    let arraylen = usersArray.length;

    let newUsergroup: FormGroup = this.fb.group({
      cname: ['']
    });

    usersArray.insert(arraylen, newUsergroup);
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
