import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiservice: ApiService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(data: NgForm) {
    this.apiservice.checkLogIn(data.value).subscribe((response: any) => {
      console.log(response.message);
      if (response.message === "access"){
        this.router.navigateByUrl('survey');
        localStorage.setItem('logStatus','user');
      }
     else  if (response.message === "admin"){
        this.router.navigateByUrl('adminPanel');
        localStorage.setItem('logStatus','admin');
      }
      else {
        localStorage.setItem('logStatus','revoked');
        alert('incorrect username or password !');
      }
    });
  }

}
