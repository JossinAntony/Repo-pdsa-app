import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css']
})
export class CompensationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(data: NgForm) {
    console.log(data.value);
  }

}
