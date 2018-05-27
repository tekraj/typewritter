import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
  host: {
    '(document:keypress)': 'handleKeyPressEvent($event)',
 	  '(document:keyup)': 'handleKeyUpEvent($event)',
 	  '(document:mouseup)': 'handleMouseUpEvent($event)',
  }
})
export class KeyboardComponent implements OnInit {
  public typeSettings: any = {};
  public pageHeader: string = 'U3: Info';
  public mainInfoText: string = 'Schreib die folgenden Zeile langsam and ohne auf die tastaur zu secen. Bechte dabei, dass die Finger aut ihren richtigen Tasten bleiben';
  public nextInfo: number = 1;
  public headerHide: boolean = true;
  public collapseHeader: boolean;
  public words: string[];
  public wordIndex: any;
  public totalWords: any;
  public wordIndexInterval: any;
  public animationInterval: any;
  public bottomPosition: any;
  public wordMatch: boolean;
  public totalAttempt: any;
  public totalHit: any;
  public hitPercent: any;
  public keyValue: any;
  public keyboard: any = {};
  constructor(private localStorageService: LocalStorageService) {
    this.keyboard.typingValue = 'aaa sss ddd fff ggg fff ggg aaaa ddd sss';
    let settingData = localStorageService.select('typeSettings');
    if (settingData == false) {
      this.typeSettings = { stringLength: 0, value: "asdfghjklö", typewriterMode: '', presentation: 0, sound: 'kein_sound', soundVolume: 1, muteSound: false };
    } else {
      this.typeSettings = settingData;

    }

    this.words = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
      "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "z"
    ];
    this.totalWords = this.words.length;
    this.bottomPosition = -100;
    this.wordMatch = false;
    this.totalAttempt = 0;
    this.totalHit = 0;
    this.hitPercent = 0;
    this.keyValue = '';
  }

  ngOnInit() {

    setTimeout(() => {
      this.headerHide = false;
    }, 500);
  }

  setSoundVolume = (value: number) => {
    this.typeSettings.soundVolume = value;
    this.localStorageService.insert('typeSettings', this.typeSettings);
  }
  soundSetting = (value: boolean) => {
    this.typeSettings.muteSound = value;
    this.localStorageService.insert('typeSettings', this.typeSettings);
  }

  writeText (key){
		this.keyValue = key;
		 if(key==this.words[this.wordIndex]){
    		this.totalHit += 1;
    		this.hitPercent = ((this.totalHit/this.totalAttempt)*100).toFixed(2);
    		 clearInterval(this.animationInterval);
    		this.wordMatch = true;
    	}
	}

	handleKeyPressEvent(event: KeyboardEvent) {
    	let key = event.key;
    	this.keyValue = key;
    	if(key==this.words[this.wordIndex]){
    		this.totalHit += 1;
    		this.hitPercent = ((this.totalHit/this.totalAttempt)*100).toFixed(2);
    		 clearInterval(this.animationInterval);
    		this.wordMatch = true;
    	}
  	}

  	handleKeyUpEvent (event : KeyboardEvent){
  		this.keyValue = '';
  	}
  	handleMouseUpEvent (event : MouseEvent){
  		setInterval ( () => {
			this.keyValue = '';
  		},200);
  		
  	}
}
