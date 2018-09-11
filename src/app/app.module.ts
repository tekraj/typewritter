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



import { TypewriterSpComponent } from './typewriter-sp/typewriter-sp.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TypewriterSmComponent } from './typewriter-sm/typewriter-sm.component';
import { TypewriterDzComponent } from './typewriter-dz/typewriter-dz.component';
import { TypewriterDtComponent } from './typewriter-dt/typewriter-dt.component';
import { TypewriterBsComponent } from './typewriter-bs/typewriter-bs.component';
import { AlbumForLessionComponent } from './album-for-lession/album-for-lession.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModuleComponent,
    InfoComponent,
    ExerciseComponent,
    TypewriterSmComponent,
    TypewriterDzComponent,
    TypewriterSpComponent,
    TypewriterDtComponent,
    TypewriterBsComponent,
    GalleryComponent,
    AlbumForLessionComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule ,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }