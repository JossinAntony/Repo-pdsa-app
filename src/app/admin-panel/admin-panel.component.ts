import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private apiservice: ApiService) { }
  collection: any;
  ngOnInit() {
  }

  onRetrieve() {
    this.apiservice.retrievePeople().subscribe((response:Array<object>) => {
      this.collection = response;
      console.log(this.collection[0]);
  });
  }

}
