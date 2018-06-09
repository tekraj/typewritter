import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Howl, Howler } from 'howler';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  host: {
    '(document:keydown)': 'handleKeyDownEvent($event)',
    '(document:keyup)': 'handleKeyUpEvent($event)',
    '(document:mouseup)': 'handleMouseUpEvent($event)',
  }
})
export class ExerciseComponent implements OnInit {
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
  public currentExercise = { name: '', header: '', flagText: '', content: '' };
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
  public exerciseParams: any;
  public typingValue: string = '';
  public currentLessionIndex: number;
  public currentSoundLevel = 0;
  public metroSound = 'Metro aus';
  public backgroundSound: any;
  constructor(private _apiService: ApiService, private localStorageService: LocalStorageService, private route: ActivatedRoute) {


    let settingData = localStorageService.select('typeSettings');
    if (settingData == false) {
      this.typeSettings = { stringLength: 1, value: "asdfghjklö", typewriterMode: '', presentation: 0, sound: 'kein_sound', soundVolume: 1, muteSound: false };
    } else {
      this.typeSettings = settingData;

    }
    for (let i = 1; i <= this.typeSettings.stringLength; i++) {
      this.typingValue += this.typeSettings.value + ' ';
    }
    this.keyboard.typingValue = this.typingValue.trim().split('');
    this.totalWords = this.typingValue.length;

    this.letterClasses = [{ class: 'primary', letters: ['a', 'q', 'z', '1', , '!', '2', '"', 'ß', '?', '´', '`', 'p', 'ü', '-', '_', 'ö', 'ä'] },
    { class: 'warning', letters: ['3', '§', 'w', 's', 'x', '0', '=', 'o', 'l', ':', '.'] },
    { class: 'success', letters: ['4', '$', '9', ')', 'i', 'k', ';', ',', 'd'] },
    { class: 'danger', letters: ['5', '%', '5', '&', '7', '/', '8', '(', 'r', 't', 'y', 'u', 'f', 'g', 'h', 'j', 'v', 'b', 'n', 'm'] }];

    this.setSound(this.typeSettings.sound);

    this.clickWrongSound = new Howl({
      src: ['../assets/sounds/wrong-click.mp3']
    });
    Howler.volume(this.typeSettings.soundVolume / 100);
    this.exercises = [];
    this.currentSoundLevel = this.typeSettings.soundVolume;
  }

  ngOnInit() {
    this.exerciseParams = this.route.params['value'];
    this.currentLessionIndex = parseInt(this.exerciseParams.lessionIndex);
    this.getExercise(this.exerciseParams);
    setTimeout(() => {
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
this.keyValue = key;
      this.keyValue = key
  }

  handleKeyDownEvent(event: KeyboardEvent) {
  
    let key = event.key;
    this.keyValue = key;
    let typedString = this.typedString + this.keyValue;
    if (this.typingValue.indexOf(typedString) == 0) {
      
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
      if (this.clickRightSound) {
        if (this.clickRightSound == 'click') {
          let clickSound = new Howl({
            src: ['../assets/sounds/right-click.mp3']
          });
          clickSound.play();
        } else if (this.clickRightSound == 'play-letter') {
          let clickSound = new Howl({
            src: ['../assets/sounds/cs_' + keyCode + '.mp3']
          });
          clickSound.play();
        } else if (this.clickRightSound == 'icon-sound') {
          let clickSound = new Howl({
            src: ['../assets/sounds/notes/ds_' + keyCode + '.mp3']
          });
          clickSound.play();
        }

      }
    } else {
      this.clickWrongSound = new Howl({
        src: ['../assets/sounds/wrong-click.mp3']
      });
      this.clickWrongSound.play();
      this.totalWrong++;
    }
  }

  handleKeyUpEvent(event: KeyboardEvent) {
    this.keyValue = '';
  }
  handleMouseUpEvent(event: MouseEvent) {
this.keyValue = '';


  }

  private getExercise = (exerciseParams) => {
    this._apiService.getExercise(exerciseParams.lekt_nr).then((exercise) => {
      let allTItles = exercise[3].replace('uebg_titel=', '').split('|');
      let headers = exercise[4].replace('uebg_anw=', '').split('|');
      let flagTexts = exercise[5].replace('anw_mann=', '').split('|');
      let contents = exercise[6].replace('uebg_text=', '').split('|');
      allTItles.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.exercises.push({ name: 'Ü' + (i + 1) + ': ' + element, header: headers[i], flagText: flagTexts[i], content: contents[i] });
        }
      });
      this.currentExercise = this.exercises[exerciseParams.lessionIndex];

    })
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
}
