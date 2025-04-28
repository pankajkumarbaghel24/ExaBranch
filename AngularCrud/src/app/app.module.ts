import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    PagenotfoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  providers:[DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
