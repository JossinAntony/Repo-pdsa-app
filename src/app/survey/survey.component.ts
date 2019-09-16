import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatCard} from '@angular/material';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(data: NgForm) {

  }
}
