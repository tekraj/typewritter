import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModuleComponent } from './module/module.component';
import { InfoComponent } from './info/info.component';

import { ExerciseComponent } from './exercise/exercise.component';
import { TypewriterSmComponent } from './typewriter-sm/typewriter-sm.component';
import { TypewriterDzComponent } from './typewriter-dz/typewriter-dz.component';
import { TypewriterDtComponent } from './typewriter-dt/typewriter-dt.component';
import { TypewriterBsComponent } from './typewriter-bs/typewriter-bs.component';
import { TypewriterSpComponent } from './typewriter-sp/typewriter-sp.component';
import { GalleryComponent } from './gallery/gallery.component';
import {AlbumForLessionComponent} from './album-for-lession/album-for-lession.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'exercise/:lessionIndex', component: ExerciseComponent },
  { path: 'typewriter-sm/:exercise', component: TypewriterSmComponent },
  { path: 'typewriter-dz/:exercise', component: TypewriterDzComponent },
  { path: 'typewriter-dt/:exercise', component: TypewriterDtComponent },
  { path: 'typewriter-bs/:exercise', component: TypewriterBsComponent },
  { path: 'typewriter-sp/:exercise', component: TypewriterSpComponent },
  {path : 'gallery' , component :GalleryComponent},
  {path :'album-for-lession', component : AlbumForLessionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }