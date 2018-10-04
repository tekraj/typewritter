import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModuleComponent } from './module/module.component';
import { InfoComponent } from './info/info.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ModuleExerciseComponent } from './module-exercise/module-exercise.component';

const routes: Routes = [
  { 
      path: '', component: MainLayoutComponent, children:[
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'info', component: InfoComponent },
      { path: 'module', component: ModuleComponent },
      { path: 'exercise/:lessionIndex', component: ExerciseComponent },
      { path: 'module-exercise/:exercise/:type', component: ModuleExerciseComponent }
    ] 
  },
  {path : 'gallery' , component :GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }