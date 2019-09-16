import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatCard} from '@angular/material';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
  }

  onSubmit(data: NgForm) {
    this.apiservice.savePeople(data.value).subscribe(() => {
      alert('Student successfully added into database!');
    });

  }
}
