import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Howl, Howler } from 'howler';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-typewriter-dt',
  templateUrl: './typewriter-dt.component.html',
  styleUrls: ['./typewriter-dt.component.css'],
  host: {
    '(document:keydown)': 'handleKeyDownEvent($event)',
    '(document:keyup)': 'handleKeyUpEvent($event)',
    '(document:mouseup)': 'handleMouseUpEvent($event)',
  }
})


export class TypewriterDtComponent implements OnInit {
  public typeSettings: any = {};
  public nextInfo: number = 1;
  public headerHide: boolean = true;
  public exercises: Array<{ name: string, header: string, flagText: string, content: string }>;
  public collapseHeader: boolean;
  public words: string[];
  public wordIndex: any;
  public totalWords: number;
  public totalRight: number = 0;
  public totalWrong: number = 0;
  public currentExercise = { name: 'U1 Demoubung', header: 'Schreibe Sie die gelernten Buchstaben noch einmal!', flagText: 'Ich gebe dir oft Tipps - mein Name ist Fred!', content: '' };
  public keyValue: any;
  public keyboard: any = {};
  public typedString: string = '';

  public letterTypedIndex: number;
  public letterNextTyped: number = 0;
  public currentLetterImage: string;
  public letterClasses: Array<{ class: string, letters: Array<string> }>;
  public doubleQuote = '"';
  public singleQuote = "'";
  public currentTypedLetter: string;
  public currentTypedLetterClass: string;
  public clickRightSound: any;
  public clickWrongSound: any;
  public exercise: any;
  public typingValue: string = '';
  public currentLessionIndex: number;
  public showTooltipInfo: boolean = false;
  public showCompleteBox: boolean = false;
  public showZoomAnimation: boolean = true;
  public zoomButtonAnimation: boolean = false;
  public currentSoundLevel = 0;
  constructor(private _apiService: ApiService, private localStorageService: LocalStorageService, private route: ActivatedRoute) {

    this.exercise = this.route.params['value'].exercise;
    let settingData = localStorageService.select('typeSettings');
    if (settingData == false) {
      this.typeSettings = { stringLength: 1, value: "asdfghjklö", typewriterMode: '', presentation: 0, sound: 'kein_sound', soundVolume: 1, muteSound: false };
    } else {
      this.typeSettings = settingData;
    }
    for (let i = 1; i <= this.typeSettings.stringLength; i++) {
      this.typingValue += this.typeSettings.value + ' ';
    }
    this.currentSoundLevel = this.typeSettings.soundVolume;
    this.keyboard.typingValue = this.typingValue.trim().split('');
    this.totalWords = this.typingValue.length;
    this.letterClasses = [{ class: 'primary', letters: ['a', 'q', 'z', '1', , '!', '2', '"', 'ß', '?', '´', '`', 'p', 'ü', '-', '_', 'ö', 'ä'] },
    { class: 'warning', letters: ['3', '§', 'w', 's', 'x', '0', '=', 'o', 'l', ':', '.'] },
    { class: 'success', letters: ['4', '$', '9', ')', 'i', 'k', ';', ','] },
    { class: 'danger', letters: ['5', '%', '5', '&', '7', '/', '8', '(', 'r', 't', 'y', 'u', 'f', 'g', 'h', 'j', 'v', 'b', 'n', 'm'] }];

    this.clickRightSound = new Howl({
      src: ['../assets/sounds/right-click.mp3']
    });
    this.clickWrongSound = new Howl({
      src: ['../assets/sounds/wrong-click.mp3']
    });
    Howler.volume(this.typeSettings.soundVolume / 100);
    this.exercises = [];
  }

  ngOnInit() {

    setTimeout(() => {
      this.zoomButtonAnimation = true;
      this.headerHide = false;
    }, 500);
  }
  setSoundVolume = (event: any) => {
    this.currentSoundLevel = event.value;
    if (!this.typeSettings.muteSound) {
      let value = event.value;
      this.typeSettings.soundVolume = value;
      Howler.volume(value / 100);
      this.localStorageService.insert('typeSettings', this.typeSettings);
    }

  };


  soundSetting = (value: boolean) => {
    this.typeSettings.muteSound = value;
    if (value) {
     
      this.typeSettings.soundVolume = 0;
    } else {
      this.typeSettings.soundVolume = this.currentSoundLevel;
    }
    Howler.volume(this.typeSettings.soundVolume / 100);
    this.localStorageService.insert('typeSettings', this.typeSettings);
  };

  writeText(key: string, altKey: string = '') {

  }

  handleKeyDownEvent(event: KeyboardEvent) {

    let key = event.key;
    this.keyValue = key;
    let typedString = this.typedString + this.keyValue;
    if (this.typingValue.indexOf(typedString) == 0) {
      this.clickRightSound.play();
      let keyCode = event.keyCode == 32 ? 32 : (event.keyCode + 32);
      this.currentLetterImage = '../assets/images/typer/db_' + keyCode + '.jpg';
      this.currentTypedLetter = key;
      this.letterClasses.forEach((element) => {
        if (element.letters.indexOf(key) >= 0) {
          this.currentTypedLetterClass = element.class;
        }
      });
      this.typedString = typedString;
      this.letterTypedIndex = this.typedString.length - 1;
      this.letterNextTyped = this.typedString.length;

      this.totalRight++;


    } else {
      this.clickWrongSound.play();
      this.totalWrong++;
    }
    if (this.totalRight == this.typingValue.length - 1) {
      this.showCompleteBox = true;
    }
  }

  handleKeyUpEvent(event: KeyboardEvent) {
    this.keyValue = '';
  }
  handleMouseUpEvent(event: MouseEvent) {


  }



  nextExercise() {
    this.currentLessionIndex = this.currentLessionIndex + 1;
    this.currentExercise = this.exercises[this.currentLessionIndex];
  }

  continueExercise() {
    this.typedString = '';
    this.letterTypedIndex = 0;
    this.letterNextTyped = 0;
    this.totalRight = 0;
    this.totalWrong = 0;
    this.showCompleteBox = false;
  }

  setNextPractice() {
    for (let i = 1; i <= this.typeSettings.stringLength; i++) {
      this.typingValue += this.typeSettings.value + ' ';
    }
    this.keyboard.typingValue = this.typingValue.trim().split('');
    this.totalWords = this.typingValue.length;
    this.showCompleteBox = false;
  }

  showTooltipBox() {
    this.showTooltipInfo = this.showTooltipInfo === true ? false : true;
  }

  hideZoomAnimation() {
    this.showZoomAnimation = false;
  }
}
