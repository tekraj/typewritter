import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public exerciseTitles = [];
  public allExercise = [];
  public background:string;
  public innerHeight:number;
  public dateTime:string;
  public currentExercise:any;
  constructor(private _localStorageService: LocalStorageService) {
    this.exerciseTitles = this._localStorageService.select('exerciseTitles');
    this.background = 'assets/images/gallery-background.png';
    this.allExercise = this.numberToArray(this.exerciseTitles.length);
    let date = new Date();
    this.currentExercise = this._localStorageService.select('currentExercise');
    this.dateTime = date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear();
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  private numberToArray = (number) => {
    let numberArray = [];
    for (let i = 0; i < number; i++) {
      if(this.showImage(i)){
        numberArray.push(i);
      }
      
    }
    return numberArray;
  }

  public getImageType = (index) => {
    let title = this.exerciseTitles[index];
    let mod = title.id%71;
    let type = (title.grayPercent < 30 ? 0 : ((title.grayPercent >=30 && title.grayPercent < 60) ? 1 : 2));
    return '../assets/images/alb/i_0'+( mod<10 ? '0'+mod:mod)+'_'+type+'.jpg'
  }

  public showImage = (index) => {
    let title = this.exerciseTitles[index];
    if(title.type[1]==9){
      return false;
    }
    return true;
  }
  isCurrentExercise(i){
    if(i==1){
      return true;
    }
    if(this.currentExercise){
      return this.exerciseTitles[i].id==this.currentExercise.id;
    }
    return false;
  }
}

