import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Howl, Howler } from 'howler';
import { ApiService } from '../api.service';
import {Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-typewriter-bs',
  templateUrl: './typewriter-bs.component.html',
  styleUrls: ['./typewriter-bs.component.css'],
  host: {
    '(document:keydown)': 'handleKeyDownEvent($event)',
    '(document:keyup)': 'handleKeyUpEvent($event)',
    '(document:mouseup)': 'handleMouseUpEvent($event)',
  }
})

export class TypewriterBsComponent implements OnInit {
  public typeSettings: any = {};
  public nextInfo: number = 1;
  public headerHide: boolean = true;
  public exercises: Array<{ name: string, header: string, flagText: string, content: string }>;
  public collapseHeader: boolean;
  public words: string[];
  public wordIndex: any;
  public totalWords: number;
  public totalRight: number = 0;
  public totalWrong: number = 0; bv
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
  public letterIndexes: Array<string>;
  public showZoomAnimation: boolean = true;
  public zoomButtonAnimation: boolean = false;
  //for exercise two
  public typeThisImage: string = '';
  public typeThisLetterClass: string;
  public typeThisLetter: string;
  public currentSoundLevel = 0;
  public metroSound = 'Metro aus';
  public backgroundSound: any;
  public settingMode: string;
  public globalSettings: any;
  private internalTypingTime: number = 1;
  public typingTime: number = 0;
  private typingCounter: any;
  public typingSpeed: number = 0;
  public totalAccuracy: number = 0;
  public exerciseCompleted: number = 0;
  constructor(private _apiService: ApiService, private localStorageService: LocalStorageService, private route: ActivatedRoute,private router:Router) {
    this.settingMode = this.localStorageService.select('settingMode');
    this.globalSettings = this.localStorageService.select('globalSettings');
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
    this.currentSoundLevel = this.typeSettings.soundVolume
    this.keyboard.typingValue = this.typingValue.trim().split('');

    this.totalWords = this.typingValue.length;

    this.setSound(this.typeSettings.sound);
    this.clickWrongSound = new Howl({
      src: ['../assets/sounds/wrong-click.mp3']
    });
    Howler.volume(this.typeSettings.soundVolume / 100);
    this.exercises = [];

    this.letterIndexes = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "ß"
    ];
    this.typeThisLetter = this.keyboard.typingValue[0];



  }

  ngOnInit() {
    this.typeThisLetter = this.keyboard.typingValue[0];
    let letterIndex = this.letterIndexes.indexOf(this.typeThisLetter);
    let nextKeCode = letterIndex + 96 + 1;
    if (this.typeThisLetter == ' ') {
      nextKeCode = 32;
    }
    this.typeThisImage = '../assets/images/typer/' + this.settingMode + 'b_' + + nextKeCode + '.jpg';

    this.typeThisLetterClass = this.globalSettings[65 + letterIndex + 1].cssClass;
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

  writeText(normal: string, shiftKey='', ctrlKey='', altKey='') {
    if (normal) {
        this.keyValue = normal;
    } else {
        this.keyValue = 'test';
    }
}


  handleKeyDownEvent(event: KeyboardEvent) {
    if (!this.typingCounter) {
      this.typingCounter = setInterval(() => {
        this.internalTypingTime++;
      }, 1000);
    }


    this.keyValue = event.key;

    let keySettings = this.globalSettings[event.keyCode];
    if (event.altKey && this.keyValue != 'Alt') {
      this.keyValue = keySettings.letters.alt;
    } else if (event.ctrlKey && this.keyValue != 'Control') {
      this.keyValue = keySettings.letters.ctrl;
    } else if (event.shiftKey && this.keyValue != 'Shift') {
      this.keyValue = keySettings.letters.shift;
    }

    let typedString = this.typedString + this.keyValue;
    if (this.typingValue.indexOf(typedString) == 0) {
      let keyCode = event.keyCode == 32 ? 32 : (event.keyCode + 32);
      this.currentLetterImage = '../assets/images/typer/' + this.settingMode + 'b_' + + keyCode + '.jpg';
      this.currentTypedLetter = this.keyValue;
      this.currentTypedLetterClass = keySettings.cssClass;
      this.typedString = typedString;
      this.letterTypedIndex = this.typedString.length - 1;
      this.letterNextTyped = this.typedString.length;

      this.totalRight++;
      if (this.clickRightSound) {
        if (this.clickRightSound == 'click') {
          let clickSound = new Howl({
            src: ['../assets/sounds/right-click.mp3']
          });
          clickSound.play();
        } else if (this.clickRightSound == 'play-letter') {
          let clickSound = new Howl({
            src: ['../assets/sounds/' + this.settingMode + 's_' + keyCode + '.mp3']
          });
          clickSound.play();
        } else if (this.clickRightSound == 'icon-sound') {

          let clickSound = new Howl({
            src: ['../assets/sounds/icon-sound/w_' + keySettings.tast_wort + '.mp3']
          });
          clickSound.play();
        }

      }
      this.typeThisLetter = this.keyboard.typingValue[this.letterNextTyped];
      let nextLetterIndex = this.letterIndexes.indexOf(this.typeThisLetter);
      let nextKeCode = nextLetterIndex + 96 + 1;
      if (this.typeThisLetter == ' ') {
        nextKeCode = 32;
      }

      this.typeThisImage = '../assets/images/typer/' + this.settingMode + 'b_' + + nextKeCode + '.jpg';
      this.currentTypedLetterClass = keySettings.cssClass;
      this.typeThisLetterClass = this.globalSettings[65 + nextLetterIndex + 1].cssClass;
    } else {
      this.clickWrongSound = new Howl({
        src: ['../assets/sounds/wrong-click.mp3']
      });
      this.clickWrongSound.play();
      this.totalWrong++;
    }
    this.typingTime = this.internalTypingTime;
    this.typingSpeed = Math.ceil(((this.totalRight + this.totalWrong) / this.typingTime) * 60);
    this.totalAccuracy = Math.floor((this.totalRight / (this.totalRight + this.totalWrong)) * 100);

    if (this.totalRight == this.typingValue.length - 1) {
      clearInterval(this.typingCounter);
      let boxAnimation = setInterval(() => {
        this.exerciseCompleted++;
        let animationSound = new Howl({
          src: ['../assets/sounds/wrong-click.mp3']
        });
        animationSound.play();
        if (this.exerciseCompleted >= 9) {
          clearInterval(boxAnimation);
        }
      }, 300);
      this.showCompleteBox = true;
    }
  }

  handleKeyUpEvent(event: KeyboardEvent) {
    this.keyValue = 'test';
  }
  handleMouseUpEvent(event: MouseEvent) {
    this.keyValue = 'test';
  }



  nextExercise() {
    this.currentLessionIndex = this.currentLessionIndex + 1;
    this.currentExercise = this.exercises[this.currentLessionIndex];
  }
  setSound(value: string) {
    this.typeSettings.sound = value;
    this.localStorageService.insert('typeSettings', this.typeSettings);
    if (value.indexOf('hg') >= 0) {
      this.metroSound = 'Metro aus'
      this.clickRightSound = false;
      Howler.unload();
      this.backgroundSound = new Howl({
        src: ['../assets/sounds/' + value + '.mp3']
      });
      this.backgroundSound.play();

    } else if (value == 'metro_aus') {
      Howler.unload();
      if (this.metroSound == 'Metro aus') {
        this.metroSound = 'Metro 1';

        this.backgroundSound = new Howl({
          src: ['../assets/sounds/right-click.mp3'],
          loop: true,
          rate: 0.10
        });
        this.backgroundSound.play();
      } else if (this.metroSound == 'Metro 10') {
        this.metroSound = 'Metro aus'
      } else {
        let metro = this.metroSound.split(' ');
        let nextRate = parseInt(metro[1]) + 1;
        this.metroSound = metro[0] + ' ' + nextRate;
        Howler.unload();
        let soundRate = 0.10 + (nextRate * 0.10);
        soundRate = soundRate > 1 ? 1 : soundRate;
        this.backgroundSound = new Howl({
          src: ['../assets/sounds/right-click.mp3'],
          loop: true,
          rate: soundRate
        });
        this.backgroundSound.play();
      }
    } else {
      this.metroSound = 'Metro aus'
      this.setClickSound();
    }
  }

  setClickSound() {
    switch (this.typeSettings.sound) {

      case 'click': {
        this.clickRightSound = 'click';
        break;
      }
      case 'bst': {
        this.clickRightSound = 'play-letter';
        break;
      }
      case 'icon': {
        this.clickRightSound = 'icon-sound';
        break;
      }
      default: {
        this.clickRightSound = false;
        break;
      }
    }
    Howler.unload();

  }

  checkLetterExists(letter: string, extLetter: string = '') {
    if (this.typingValue.indexOf(letter) >= 0)
      return true;
    return false;
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
  nagivateFunction(link) {
    Howler.unload();
    this.router.navigate([link]);
  }
}
