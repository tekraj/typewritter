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
  constructor(private _localStorageService: LocalStorageService) {
    this.exerciseTitles = this._localStorageService.select('exerciseTitles');
    console.log(this.exerciseTitles);
    this.allExercise = this.numberToArray(this.exerciseTitles.length);
  }

  ngOnInit() {

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
    return (title.grayPercent < 60 ? 0 : ((title.grayPercent >= 60 && title.grayPercent < 100) ? 1 : 2));
  }

  public showImage = (index) => {
    let title = this.exerciseTitles[index];
    if(title.type[1]==9){
      return false;
    }
    return true;
  }
}
