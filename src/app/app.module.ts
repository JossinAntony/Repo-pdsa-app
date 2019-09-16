import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  {path: '', component: SurveyComponent},
  {path: 'adminPanel', component: AdminPanelComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    AdminPanelComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
