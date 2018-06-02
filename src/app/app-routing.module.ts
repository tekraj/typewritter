import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModuleComponent } from './module/module.component';
import { InfoComponent } from './info/info.component';

import { ExerciseComponent } from './exercise/exercise.component';
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
const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'exercise/:lekt_nr/:lessionIndex', component: ExerciseComponent },
  { path: 'typewriter-sm-one', component: TypewriterSmOneComponent },
  { path: 'typewriter-sm-two', component: TypewriterSmTwoComponent },
  { path: 'typewriter-sm-three', component: TypewriterSmThreeComponent },
  { path: 'typewriter-sm-four', component: TypewriterSmFourComponent },
  { path: 'typewriter-sm-five', component: TypewriterSmFiveComponent },
  { path: 'typewriter-dz-one', component: TypewriterDzOneComponent },
  { path: 'typewriter-dz-two', component: TypewriterDzTwoComponent },
  { path: 'typewriter-dz-three', component: TypewriterDzThreeComponent },
  { path: 'typewriter-dz-four', component: TypewriterDzFourComponent },
  { path: 'typewriter-dz-five', component: TypewriterDzFiveComponent },
  { path: 'typewriter-dt-one', component: TypewriterDtOneComponent },
  { path: 'typewriter-dt-two', component: TypewriterDtTwoComponent },
  { path: 'typewriter-dt-three', component: TypewriterDtThreeComponent },
  { path: 'typewriter-dt-four', component: TypewriterDtFourComponent },
  { path: 'typewriter-dt-five', component: TypewriterDtFiveComponent },
  { path: 'typewriter-bs-one', component: TypewriterBsOneComponent },
  { path: 'typewriter-bs-two', component: TypewriterBsTwoComponent },
  { path: 'typewriter-bs-three', component: TypewriterBsThreeComponent },
  { path: 'typewriter-bs-four', component: TypewriterBsFourComponent },
  { path: 'typewriter-bs-five', component: TypewriterBsFiveComponent },
  { path: 'typewriter-sp', component: TypewriterSpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
