import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModuleComponent } from './module/module.component';
import { InfoComponent } from './info/info.component';
import { ExerciseComponent } from './exercise/exercise.component';
const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'module', component: ModuleComponent },
  {path: 'exercise/:lekt_nr/:lessionIndex', component : ExerciseComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
