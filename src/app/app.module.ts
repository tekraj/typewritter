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




import { ExerciseComponent } from './exercise/exercise.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { ModuleExerciseComponent } from './module-exercise/module-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModuleComponent,
    InfoComponent,
    ExerciseComponent,
    GalleryComponent,
    MainLayoutComponent,
    ModuleExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule ,
    BrowserAnimationsModule,
    SortablejsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }