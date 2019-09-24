import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
import {MatInputModule, MatButtonModule, MatExpansionModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule, MatSidenavModule, MatListModule} from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';


import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ShowDataComponent } from './show-data/show-data.component';
import { ShowStatisticsComponent } from './show-statistics/show-statistics.component';
import { CompensationComponent } from './compensation/compensation.component';

const appRoutes: Routes = [
  {
    path: 'survey',
    component: SurveyComponent
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: ShowDataComponent
      },
      {
        path: 'showData',
        component: ShowDataComponent
      },
      {
        path: 'showStatistics',
        component: ShowStatisticsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/survey',
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: '/survey',
    pathMatch: 'full'
},


  { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' } }
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    AdminPanelComponent,
    NavbarComponent,
    DashboardComponent,
    SidenavComponent,
    FirstComponent,
    SecondComponent,
    ShowDataComponent,
    ShowStatisticsComponent,
    CompensationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatExpansionModule, MatToolbarModule,
    MatSelectModule, MatOptionModule, MatGridListModule, MatMenuModule, MatIconModule, LayoutModule,
    MatNativeDateModule, MatSidenavModule, MatListModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
