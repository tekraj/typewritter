import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  title = 'Gallery';
  public innerHeight : number;
  public background:string;
  public dateTime:string;
  constructor() { 
    let now = new Date();
    this.dateTime = now.getDate()+'.'+(now.getMonth()+1)+'.'+now.getFullYear();
    this.background = '../assets/images/gallery-background.png';
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
  public getArrayFromNumber (num:number){
    let numberArray = [];
    for(let i=1;i<=num;i++){
      numberArray.push(i);
    }
    return numberArray;
  }
}
