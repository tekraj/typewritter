import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {trigger, style, animate, transition} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {Howl, Howler} from 'howler';
import {ApiService} from '../api.service';

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
    public exercises: Array<{ id: number, name: string, percent: number, grayPercent: number, yellowPercent: number, mode: number, type: Array<number>, content: string, topBarTitle: string, flagTitle: string }>;
    public collapseHeader: boolean;
    public words: string[];
    public wordIndex: any;
    public totalWords: number;
    public totalRight: number = 0;
    public totalWrong: number = 0;
    public currentExercise: { id: number, name: string, percent: number, grayPercent: number, yellowPercent: number, mode: number, type: Array<number>, content: string, topBarTitle: string, flagTitle: string };
    public keyValue: any;
    public keyboard: any = {};
    public typedString = '';
    public letterTypedIndex: number;
    public letterNextTyped: number = 0;
    public currentLetterImage: string;
    public letterClasses: Array<{ class: string, letters: Array<string> }>;
    public doubleQuote = '"';
    public singleQuote = '\'';
    public currentTypedLetter: string;
    public currentTypedLetterClass: string;
    public clickRightSound: any;
    public clickWrongSound: any;
    public exerciseParams: any;
    public typingValue = '';
    public currentLessionIndex: number;
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
    public soundArray: Array<string> = ['kein_sound', 'click', 'bst', 'icon', 'metro_aus', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5', 'hg6', 'hg7', 'hg8', 'hg9', 'hg9'];
    public practiceMode: number;
    public grid: number;
    public visibleKeyboardLetters: Array<string>;
    public showZoomAnimation:boolean = true;
    public totalWidth =0;
    public textLeftMove = 0;
    public showCompleteBox = false;
    public zoomButtonAnimation = true;
    public showHeaderText = false;
    public totalWordWidth:number;
    public  keyboardArea = [
        //No Indication
        {letters: []},
        //basic row left
        {letters: ['a', 's', 'd', 'f', 'g']},
        //basic row right
        {letters: ['h', 'j', 'k', 'l', 'ö',]},
        //Top Row left
        {letters: ['q', 'w', 'e', 'r', 't', 'z']},
        // top row right
        {letters: ['z', 'u', 'i', 'o', 'p']},
        // sub row left
        {letters: []},
        // number series left
        {letters: []},
        // number series right
        {letters: []},
        //Signs and Symbols left
        {letters: []},
        //Signs and Symbols right
        {letters: []},
        // Alt Gear left
        {letters: []},
        //alt gear right
        {letters: []},
        // alt entire keyboard
        {
            letters: ['°', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ss', '`', 'q', 'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü', '*', 'a',
                's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', '\'', '>', 'y', 'x', 'c', 'v', 'b', 'n', 'm', ';', ',', ':']
        }

    ];
    constructor(private _apiService: ApiService, private localStorageService: LocalStorageService, private route: ActivatedRoute) {
        this.exerciseParams = this.route.params['value'];
        this.currentLessionIndex = parseInt(this.exerciseParams.lessionIndex);
        this.exercises = this.localStorageService.select('exerciseTitles');
        this.currentExercise = this.exercises[this.currentLessionIndex];
        this.visibleKeyboardLetters = this.keyboardArea[this.currentExercise.type[0]].letters;
        this.practiceMode = this.currentExercise.type[1];
        this.grid = this.currentExercise.type[2];

        this.settingMode = this.localStorageService.select('settingMode');
        this.globalSettings = this.localStorageService.select('globalSettings');
        this.typeSettings = {
            stringLength: 1,
            value: this.trimHtml(this.currentExercise.content),
            typewriterMode: 1,
            presentation: 0,
            sound: this.soundArray[this.currentExercise.type[3]],
            soundVolume: 1,
            muteSound: false
        };
        this.setSound(this.typeSettings.sound);
        for (let i = 1; i <= this.typeSettings.stringLength; i++) {
            this.typingValue += this.typeSettings.value + ' ';
        }
        this.keyboard.typingValue = this.typingValue.trim().split('');
        this.totalWords = this.typingValue.length;

        this.letterClasses = [{
            class: 'primary',
            letters: ['a', 'q', 'z', '1', , '!', '2', '"', 'ß', '?', '´', '`', 'p', 'ü', '-', '_', 'ö', 'ä']
        },
            {class: 'warning', letters: ['3', '§', 'w', 's', 'x', '0', '=', 'o', 'l', ':', '.']},
            {class: 'success', letters: ['4', '$', '9', ')', 'i', 'k', ';', ',', 'd', 'e']},
            {
                class: 'danger',
                letters: ['5', '%', '5', '&', '7', '/', '8', '(', 'r', 't', 'y', 'u', 'f', 'g', 'h', 'j', 'v', 'b', 'n', 'm']
            }];

        Howler.volume(this.typeSettings.soundVolume / 100);
        this.exercises = [];
        this.currentSoundLevel = this.typeSettings.soundVolume;
        this.totalWordWidth = 15 * this.keyboard.typingValue.length;
     
    }

    ngOnInit() {
        this.zoomButtonAnimation = false;
        setTimeout(() => {
            this.headerHide = false;
            this.zoomButtonAnimation = true;
            this.showHeaderText = true;
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
            this.currentLetterImage = '../assets/images/typer/' + this.settingMode + 'b_' + +keyCode + '.jpg';
            this.currentTypedLetter = this.keyValue;
            this.currentTypedLetterClass = keySettings.cssClass;
            this.typedString = typedString;
            this.letterTypedIndex = this.typedString.length - 1;
            this.letterNextTyped = this.typedString.length;

            this.totalRight++;
            if (this.totalRight * 15 > this.totalWidth) {
                this.textLeftMove = this.totalWidth - (this.totalRight * 15);
            }

            if (this.clickRightSound) {
                if (this.clickRightSound == 'click') {
                    let clickSound = new Howl({
                        src: ['../assets/sounds/right-click.mp3']
                    });
                    clickSound.play();
                } else if (this.clickRightSound == 'play-letter') {
                    let clickSound = new Howl({
                        src: ['../assets/sounds/' + 'cs_' + keyCode + '.mp3']
                    });
                    clickSound.play();
                } else if (this.clickRightSound == 'icon-sound') {
                    let clickSound = new Howl({
                        src: ['../assets/sounds/icon-sound/w_' + keySettings.tast_wort + '.mp3']
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

    private getExercise = (lessionIndex) => {
        
        this.exercises = this.localStorageService.select('exerciseTitles');
        this.currentExercise = this.exercises[lessionIndex];
        this.visibleKeyboardLetters = this.keyboardArea[this.currentExercise.type[0]].letters;
        this.typeSettings.sound = this.soundArray[this.currentExercise.type[3]];
        this.practiceMode = this.currentExercise.type[1];
        this.grid = this.currentExercise.type[2];
        this.currentLessionIndex = lessionIndex;
        this.setSound(this.typeSettings.sound);
        this.typeSettings.value = this.currentExercise.content;
    };

    nextExercise() {
        this.currentLessionIndex = this.currentLessionIndex + 1;
      
        if (this.currentLessionIndex >= this.exercises.length) {
            this.currentLessionIndex = 0;
        }
        console.log(this.currentLessionIndex);
       this.getExercise(this.currentLessionIndex);
    }

    prevExercise() {
        this.currentLessionIndex = this.currentLessionIndex - 1;
       console.log(this.exercises.length);
        if (this.currentLessionIndex <= 0) {
            console.log(this.exercises.length);
            this.currentLessionIndex = this.exercises.length - 1;
        }
        console.log(this.currentLessionIndex);
        this.getExercise(this.currentLessionIndex);
    }

    setSound(value: string) {
        this.typeSettings.sound = value;
        this.localStorageService.insert('typeSettings', this.typeSettings);
        if (value.indexOf('hg') >= 0) {
            this.metroSound = 'Metro aus';
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
                this.metroSound = 'Metro aus';
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
            this.metroSound = 'Metro aus';
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
    //    if(this.visibleKeyboardLetters.indexOf(letter)>=0){
    //        return true;
    //    }else if(this.visibleKeyboardLetters.indexOf(extLetter)>=0){
    //        return true;
    //    }
    //    return false;
        return true;
    }
    hideZoomAnimation(){
        this.showZoomAnimation = false;
    }

    private trimHtml(htmlString){
       return htmlString.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
    }
}
