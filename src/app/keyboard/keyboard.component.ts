import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Howl, Howler } from 'howler';
@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
  host: {
    '(document:keydown)': 'handleKeyDownEvent($event)',
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
  public totalWords: number;
  public totalRight: number = 0;
  public totalWrong: number = 0;
  public keyValue: any;
  public keyboard: any = {};
  public typedString: string = '';
  public typingValue: string = '';
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
  constructor(private localStorageService: LocalStorageService) {
    this.typingValue = 'aaa sss ddd fff ggg fff ggg aaaa ddd sss';
    this.keyboard.typingValue = this.typingValue.split('');
    let settingData = localStorageService.select('typeSettings');
    if (settingData == false) {
      this.typeSettings = { stringLength: 0, value: "asdfghjklö", typewriterMode: '', presentation: 0, sound: 'kein_sound', soundVolume: 1, muteSound: false };
    } else {
      this.typeSettings = settingData;

    }
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
    Howler.volume(this.typeSettings.soundVolume/100);
  }

  ngOnInit() {

    setTimeout(() => {
      this.headerHide = false;
    }, 500);
  }

  setSoundVolume = (event:any) => {
    let value = event.value;
    this.typeSettings.soundVolume = value;
    Howler.volume(value/100);
    this.localStorageService.insert('typeSettings', this.typeSettings);
  }
  soundSetting = (value: boolean) => {
    this.typeSettings.muteSound = value;
    if (value){
      Howler.volume(0);
      this.typeSettings.soundVolume = 0;
    }
      
    this.localStorageService.insert('typeSettings', this.typeSettings);
  }

  writeText(key: string, altKey: string = '') {

  }

  handleKeyDownEvent(event: KeyboardEvent) {
    console.log(event);
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
  }

  handleKeyUpEvent(event: KeyboardEvent) {
    this.keyValue = '';
  }
  handleMouseUpEvent(event: MouseEvent) {


  }
}
