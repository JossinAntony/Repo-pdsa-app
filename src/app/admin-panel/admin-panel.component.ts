import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private apiservice: ApiService, private router: Router) { }
  collection: any;

  ngOnInit() {
    status=localStorage.getItem('logStatus');
    console.log(status);
    if(status != ("admin")){
      console.log('inadminloop');
      if(status == ("user")){
        console.log('inuserloop');
        this.router.navigateByUrl('survey');
      }else {
        console.log('inelse');
        this.router.navigateByUrl('');
      }
    }
  }

  onRetrieve() {
    this.apiservice.retrievePeople().subscribe((response:Array<object>) => {
      this.collection = response;
      console.log(this.collection[0]);
  });
  }

}
