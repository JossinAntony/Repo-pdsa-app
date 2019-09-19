import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {MatCard, MatOption, MatSelect} from '@angular/material';
import { ApiService } from '../api.service';
import { ChildrenOutletContexts } from '@angular/router';



@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private apiservice: ApiService, public fb: FormBuilder, private ef: ElementRef) { }

  public surveyForm: FormGroup;
  public children: Array<{}>;

  // domCasStatus = this.ef.nativeElement.querySelector('#casStatus');

  step = 0;

  CasualityStatuses: any = ['Deceased', 'Injured', 'Missing']



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


      casualities: this.fb.array([
        this.fb.group({
          casStatus: [''],
          casRln: [''],
          casName: [''],
          casAge: ['']
        })]),

      assets: this.fb.array([
        this.fb.group({
          astTyp: [''],
          astStatus: [''],
          astArea: [''],
          astBldno: ['']
        })]),

      children: this.fb.array([
        this.fb.group({
          cname: [''],
          cge: ['']
        })])


     });
    this.removeCasualityControl(0);
    this.removeAssetControl(0);
    this.removeFormControl(0);
  }

// ---Group Casuality functions -----------------------------------------------------
  addChildrenCasuality() {
    let casualityArray = this.surveyForm.controls.casualities as FormArray;
    let arraylen = casualityArray.length;

    let newCasualitygroup: FormGroup = this.fb.group({
      casStatus: [''],
      casRln: [''],
      casName: [''],
      casAge: ['']
    });

    casualityArray.insert(arraylen, newCasualitygroup);
  }

  removeCasualityControl(i) {
    let casualityArray = this.surveyForm.controls.casualities as FormArray;
    casualityArray.removeAt(i);
  }
// -------------------------------------------------------------------------------------
// ---Group Asset functions -----------------------------------------------------
addChildrenAsset() {
  let assetArray = this.surveyForm.controls.assets as FormArray;
  let arraylen = assetArray.length;

  let newAssetgroup: FormGroup = this.fb.group({
    astTyp: [''],
    astStatus: [''],
    astArea: [''],
    astBldno: ['']
  });

  assetArray.insert(arraylen, newAssetgroup);
}

removeAssetControl(i) {
  let assetArray = this.surveyForm.controls.assets as FormArray;
  assetArray.removeAt(i);
}
// -------------------------------------------------------------------------------------

// ---Group Children functions --------------------------------------------------------
  addChildren() {
    let childrenArray = this.surveyForm.controls.children as FormArray;
    let arraylen = childrenArray.length;

    let newChildrengroup: FormGroup = this.fb.group({
      cname: [''],
      cge: [''],
      cstatus: ['']
    });

    childrenArray.insert(arraylen, newChildrengroup);
  }

  removeFormControl(i) {
    let childrenArray = this.surveyForm.controls.children as FormArray;
    childrenArray.removeAt(i);
  }
// ---------------------------------------------------------------------------------------





// --- Submit function--------------------------------------------------------------------

  onSubmit(data: NgForm) {
    // this.apiservice.savePeople(this.surveyForm.value).subscribe(() => {
    // alert('Student successfully added into database!');
    console.log(JSON.stringify(this.surveyForm.value));

    }

// ---------------------------------------------------------------------------------------
// --- Mat expansion panel navigation functions----
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
// -----------------------------------------------------------------------------------------

}
