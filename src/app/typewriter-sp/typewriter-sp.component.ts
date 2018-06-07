import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { trigger, style, animate, state, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Howl, Howler } from 'howler';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-exercise',
    templateUrl: './typewriter-sp.component.html',
    styleUrls: ['./typewriter-sp.component.css'],
    host: {
        '(document:keydown)': 'handleKeyDownEvent($event)',
        '(document:keyup)': 'handleKeyUpEvent($event)',
        '(document:mouseup)': 'handleMouseUpEvent($event)',
    },
    animations: [
        trigger('ballonState', [
            state('inactive', style({
                bottom: '-40px'
            })),
            state('preactive', style({
                bottom: '20px'
            })),
            state('active', style({
                transform: 'translateY(-43vh)'
            })),
            transition('inactive => active', animate('10000ms linear')),
        ])
    ]
})

export class TypewriterSpComponent implements OnInit {
    public typeSettings: any = {};
    public headerHide = true;
    public exercises: Array<{ name: string, header: string, flagText: string, content: string }>;
    public collapseHeader: boolean;
    public totalWords: number;
    public totalRight = 0;
    public totalWrong = 0;
    public currentExercise = { name: '', header: '', flagText: '', content: '' };
    public keyValue: any;
    public keyboard: any = {};
    public typedString = '';
    public doubleQuote = '"';
    public singleQuote = '\'';
    public currentTypedLetter: string;
    public clickRightSound: any;
    public clickWrongSound: any;
    public exerciseParams: any;
    public typingValue = '';
    public currentLessionIndex: number;
    public exercise: number;
    public intervalTimer: any;
    public currentLetters: Array<{ letter: string, animation: boolean, left: any, bottom: any, del: boolean, initial: boolean }>;
    public cLetters = '';
    public clearLetterInterval: any;
    public letterClasses: Array<{ class: string, letters: Array<string> }>;
    public currentSoundLevel = 0;
    constructor(private _apiService: ApiService, private localStorageService: LocalStorageService, private route: ActivatedRoute) {
        let exercise = this.route.params['value'].exercise;
        let exerciseArray = ['one', 'two', 'three', 'four', 'five'];
        this.exercise = exerciseArray.indexOf(exercise) + 1;
        let settingData = localStorageService.select('typeSettings');
        if (settingData == false) {
            this.typeSettings = {
                stringLength: 1,
                value: 'asdfghjklö',
                typewriterMode: '',
                presentation: 0,
                sound: 'kein_sound',
                soundVolume: 1,
                muteSound: false
            };
        } else {
            this.typeSettings = settingData;

        }
        for (let i = 1; i <= this.typeSettings.stringLength; i++) {
            this.typingValue += this.typeSettings.value;
        }
        this.currentSoundLevel = this.typeSettings.soundVolume;
        this.totalWords = this.typingValue.length;
        let startIndex = Math.floor(Math.random() * (this.exercise - 1 + 1)) + 1;
        let endIndex = Math.min(this.totalWords, startIndex + this.exercise);
        this.currentLetters = [];
        for (let i = startIndex; i < endIndex; i++) {
            let randomLeft = Math.floor(Math.random() * (90 - 1 + 1)) + 1;
            let thisText = this.typingValue[i - 1];
            this.cLetters += thisText;
            this.currentLetters.push({ letter: thisText, animation: false, left: randomLeft, bottom: 50, del: false, initial: true });
            this.typingValue.replace(thisText, '');
        }
        if (startIndex + this.exercise > this.totalWords) {
            let remainingIndex = startIndex + this.exercise - this.totalWords;
            for (let i = 0; i < remainingIndex; i++) {
                if (this.currentLetters.length <= this.totalWords) {
                    let randomLeft = Math.floor(Math.random() * (90 - 1 + 1)) + 1;
                    let thisText = this.typingValue[i];
                    this.cLetters += thisText;
                    this.currentLetters.push({ letter: this.typingValue[i], animation: false, left: randomLeft, bottom: 50, del: false, initial: true });
                    this.typingValue.replace(thisText, '');
                }
            }
        }


        this.clickRightSound = new Howl({
            src: ['../assets/sounds/right-click.mp3']
        });
        this.clickWrongSound = new Howl({
            src: ['../assets/sounds/wrong-click.mp3']
        });
        Howler.volume(this.typeSettings.soundVolume / 100);
        this.letterClasses = [{ class: 'primary', letters: ['a', 'q', 'z', '1', , '!', '2', '"', 'ß', '?', '´', '`', 'p', 'ü', '-', '_', 'ö', 'ä'] },
        { class: 'warning', letters: ['3', '§', 'w', 's', 'x', '0', '=', 'o', 'l', ':', '.'] },
        { class: 'success', letters: ['4', '$', '9', ')', 'i', 'k', ';', ',', 'd'] },
        { class: 'danger', letters: ['5', '%', '5', '&', '7', '/', '8', '(', 'r', 't', 'y', 'u', 'f', 'g', 'h', 'j', 'v', 'b', 'n', 'm'] }];

    }

    ngOnInit() {
        setTimeout(() => {
            this.headerHide = false;
        }, 500);


        this.intervalTimer = setInterval(() => {
            if (this.currentLetters.length < this.exercise) {
                this.createElement();
            }
        }, 100);

        setInterval(() => {
            this.currentLetters.forEach((element, index) => {
                if (element.del) {
                    this.currentLetters.splice(index, 1);
                    this.cLetters = this.cLetters.replace(this.cLetters[index], '');
                }
            });
        }, 100);

    }

    public removeElement(index: number, animation: boolean) {
        if (animation && this.currentLetters.length > index) {
            this.currentLetters[index].del = true;
        }

    }
    public createElement() {
        let currentTextLength = this.typingValue.length;
        let randIndex = Math.floor(Math.random() * (currentTextLength - 0 + 1)) + 0;
        let currentText = this.typingValue[randIndex];
        this.cLetters += currentText;
        this.typingValue.replace(currentText, '');
        let randomLeft = Math.floor(Math.random() * (90 - 1 + 1)) + 1;

        this.currentLetters.push({ letter: currentText, animation: false, left: randomLeft, bottom: -50, del: false, initial: false });
        let currentIndex = this.currentLetters.length - 1;
        setTimeout(() => {
            this.currentLetters[this.currentLetters.length - 1].animation = true;
        }, 50);


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
        var typedIndex = this.cLetters.indexOf(key)
        console.log(typedIndex);
        if (typedIndex >= 0) {
            this.clickRightSound.play();
            this.totalRight++;
            this.currentLetters[typedIndex].del = true;
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
    setSound(value: string) {
        this.typeSettings.sound = value;
        this.localStorageService.insert('typeSettings', this.typeSettings);
    }

    checkLetterExists(letter: string, extLetter: string = '') {
        if (this.typingValue.indexOf(letter) >= 0) {
            return true;
        }
        return false;
    }
    getLetterClass(letter: string) {
        let activeClass: string;
        this.letterClasses.forEach((element) => {
            if (element.letters.indexOf(letter) >= 0) {
                activeClass = element.class;
            }
        });
        return activeClass;
    }


}
