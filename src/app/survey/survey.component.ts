import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {MatCard, MatOption, MatSelect} from '@angular/material';
import { ApiService } from '../api.service';
import { ChildrenOutletContexts, Router } from '@angular/router';



@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private apiservice: ApiService, public fb: FormBuilder, private ef: ElementRef, private router: Router) { }

  public surveyForm: FormGroup;
  public children: Array<{}>;


  step = 0;

  CasualityStatuses: any = ['Deceased', 'Injured', 'Missing']



  ngOnInit() {

    status=localStorage.getItem('logStatus');
    if(!((status == "admin") || (status == 'user'))){
      this.router.navigateByUrl('');
      localStorage.setItem('logStatus','revoked');
    }

    this.surveyForm = this.fb.group({
      sname: [''],
      sdesig: [''],
      sdate: [''],
      dcode: [''],
      dplace: [''],

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

      vehicles: this.fb.array([
        this.fb.group({
          vhlTyp: [''],
          vhlStatus: [''],
          vhlMake: [''],
          vhlMdl: [''],
          vhlNo: [''],
          vhlIns: ['']
        })]),

        cmnts: ['']
     });
    this.removeCasualityControl(0);
    this.removeAssetControl(0);
    this.removeVehicleControl(0);
    //this.removeFormControl(0);
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
// ---Group Vehicle functions -----------------------------------------------------
addChildrenVehicle() {
  let vehicleArray = this.surveyForm.controls.vehicles as FormArray;
  let arraylen = vehicleArray.length;

  let newVehiclegroup: FormGroup = this.fb.group({
    vhlTyp: [''],
    vhlStatus: [''],
    vhlMake: [''],
    vhlMdl: [''],
    vhlNo: [''],
    vhlIns: ['']
  });

  vehicleArray.insert(arraylen, newVehiclegroup);
}

removeVehicleControl(i) {
  let vehicleArray = this.surveyForm.controls.vehicles as FormArray;
  vehicleArray.removeAt(i);
}
// -------------------------------------------------------------------------------------

// // ---Group Children functions --------------------------------------------------------
//   addChildren() {
//     let childrenArray = this.surveyForm.controls.children as FormArray;
//     let arraylen = childrenArray.length;

//     let newChildrengroup: FormGroup = this.fb.group({
//       cname: [''],
//       cge: [''],
//       cstatus: ['']
//     });

//     childrenArray.insert(arraylen, newChildrengroup);
//   }

//   removeFormControl(i) {
//     let childrenArray = this.surveyForm.controls.children as FormArray;
//     childrenArray.removeAt(i);
//   }
// // ---------------------------------------------------------------------------------------





// --- Submit function--------------------------------------------------------------------

  onSubmit(data: NgForm) {
    this.apiservice.savePeople(this.surveyForm.value).subscribe(() => {
    alert('Student successfully added into database!');

    console.log(JSON.stringify(this.surveyForm.value));
    });
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
