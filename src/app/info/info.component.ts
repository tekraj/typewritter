import { Component, OnInit, NgModule } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
  public typeSettings: any = {};
  public pageHeader : string = 'U1: Info';
  public mainInfoText : string = 'Bachte diese Information';
  public nextInfo : number = 1;
  public headerHide :boolean = true;
  public collapseHeader : boolean;
  constructor(private localStorageService:LocalStorageService,private router: Router) {
    
    let settingData = localStorageService.select('typeSettings');
    if(settingData==false){
      this.typeSettings = { stringLength: 0, value: "asdfghjklö", typewriterMode: '', presentation: 0, sound: 'kein_sound',soundVolume:1,muteSound:false };
    }else{
      this.typeSettings = settingData;
      
    }
   }

  ngOnInit() {
   
    setTimeout(()=>{
      this.headerHide = false;
    },500);
  }
 
  setSoundVolume = (event:any)=>{
    
    this.typeSettings.soundVolume = event.value;
    this.localStorageService.insert('typeSettings',this.typeSettings);
  }
  soundSetting = (value:boolean)=>{
    this.typeSettings.muteSound = value;
    this.localStorageService.insert('typeSettings',this.typeSettings);
  }
  showNextInfo(){
    this.collapseHeader = true;
    this.headerHide = true;
    if(this.nextInfo>=2){
      this.router.navigate(['keyboard']);
    }else{
      this.pageHeader= 'U2: Info';
      this.mainInfoText= 'Jede Taste entspricht einem Bind';
      this.nextInfo++;
    }
    setTimeout(()=>{
      this.collapseHeader = false;
    },50);
   
    setTimeout(()=>{
      this.headerHide = false;
    },500);
  }
  setSound(value:string){
    this.typeSettings.sound = value;
    this.localStorageService.insert('typeSettings',this.typeSettings);
  }
}
