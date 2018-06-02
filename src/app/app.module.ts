import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ModuleComponent } from './module/module.component';
import { InfoComponent } from './info/info.component';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  MatSliderModule } from '@angular/material';


import { TypewriterSmOneComponent } from './typewriter-sm-one/typewriter-sm-one.component';
import { TypewriterSmTwoComponent } from './typewriter-sm-two/typewriter-sm-two.component';
import { TypewriterSmThreeComponent } from './typewriter-sm-three/typewriter-sm-three.component';
import { TypewriterSmFourComponent } from './typewriter-sm-four/typewriter-sm-four.component';
import { TypewriterSmFiveComponent } from './typewriter-sm-five/typewriter-sm-five.component';
import { TypewriterDzOneComponent } from './typewriter-dz-one/typewriter-dz-one.component';
import { TypewriterDzTwoComponent } from './typewriter-dz-two/typewriter-dz-two.component';
import { TypewriterDzThreeComponent } from './typewriter-dz-three/typewriter-dz-three.component';
import { TypewriterDzFourComponent } from './typewriter-dz-four/typewriter-dz-four.component';
import { TypewriterDzFiveComponent } from './typewriter-dz-five/typewriter-dz-five.component';
import { TypewriterDtOneComponent } from './typewriter-dt-one/typewriter-dt-one.component';
import { TypewriterDtTwoComponent } from './typewriter-dt-two/typewriter-dt-two.component';
import { TypewriterDtThreeComponent } from './typewriter-dt-three/typewriter-dt-three.component';
import { TypewriterDtFourComponent } from './typewriter-dt-four/typewriter-dt-four.component';
import { TypewriterDtFiveComponent } from './typewriter-dt-five/typewriter-dt-five.component';
import { TypewriterBsOneComponent } from './typewriter-bs-one/typewriter-bs-one.component';
import { TypewriterBsTwoComponent } from './typewriter-bs-two/typewriter-bs-two.component';
import { TypewriterBsThreeComponent } from './typewriter-bs-three/typewriter-bs-three.component';
import { TypewriterBsFourComponent } from './typewriter-bs-four/typewriter-bs-four.component';
import { TypewriterBsFiveComponent } from './typewriter-bs-five/typewriter-bs-five.component';
import { TypewriterSpComponent } from './typewriter-sp/typewriter-sp.component';
import { ExerciseComponent } from './exercise/exercise.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModuleComponent,
    InfoComponent,
    ExerciseComponent,
    TypewriterSmOneComponent,
    TypewriterSmTwoComponent,
    TypewriterSmThreeComponent,
    TypewriterSmFourComponent,
    TypewriterSmFiveComponent,
    TypewriterDzOneComponent,
    TypewriterDzTwoComponent,
    TypewriterDzThreeComponent,
    TypewriterDzFourComponent,
    TypewriterDzFiveComponent,
    TypewriterDtOneComponent,
    TypewriterDtTwoComponent,
    TypewriterDtThreeComponent,
    TypewriterDtFourComponent,
    TypewriterDtFiveComponent,
    TypewriterBsOneComponent,
    TypewriterBsTwoComponent,
    TypewriterBsThreeComponent,
    TypewriterBsFourComponent,
    TypewriterBsFiveComponent,
    TypewriterSpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }