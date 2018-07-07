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
                bottom: '-70px'
            })),
            state('preactive', style({
                bottom: '20px'
            })),
            state('active', style({
                transform: 'translateY(-30vh)'
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
    public backgroundSound: any;
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
    public showCompleteBox: boolean = false;
    public metroSound = 'Metro aus';
    public deleteTimer: any;
    public showTooltipInfo: boolean = false;
    public settingMode:string;
    public globalSettings:any;
    constructor(private _apiService: ApiService, private localStorageService: LocalStorageService, private route: ActivatedRoute) {
        this.settingMode = this.localStorageService.select('settingMode');
        this.globalSettings = this.localStorageService.select('globalSettings');
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


        Howler.volume(this.typeSettings.soundVolume / 100);
        this.setSound(this.typeSettings.sound);
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

        this.deleteTimer = setInterval(() => {
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
        this.keyValue = key;
    }

    handleKeyDownEvent(event: KeyboardEvent) {
        let key = event.key;
        var typedIndex = this.cLetters.indexOf(key)
        if (typedIndex >= 0) {
            let keyCode = event.keyCode == 32 ? 32 : (event.keyCode + 32);
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
                        src: ['../assets/sounds/' + this.settingMode + 's_' + keyCode + '.mp3']
                      });
                    clickSound.play();
                  
                }

            }

            this.totalRight++;
            if (this.currentLetters.length > typedIndex) {
                this.currentLetters[typedIndex].del = true;
            }
        } else {

            this.clickWrongSound = new Howl({
                src: ['../assets/sounds/wrong-click.mp3']
            });
            this.clickWrongSound = new Howl({
                src: ['../assets/sounds/wrong-click.mp3']
            });
            this.clickWrongSound.play();
            this.totalWrong++;
        }
        if (this.totalRight == this.typingValue.length - 1) {
            this.showCompleteBox = true;
            clearInterval(this.deleteTimer);
            clearInterval(this.intervalTimer);
        }
    }

    handleKeyUpEvent(event: KeyboardEvent) {
        this.keyValue = '';
    }

    handleMouseUpEvent(event: MouseEvent) {
        this.keyValue = '';


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

    setNextPractice() {
        for (let i = 1; i <= this.typeSettings.stringLength; i++) {
            this.typingValue += this.typeSettings.value + ' ';
        }
        this.keyboard.typingValue = this.typingValue.trim().split('');
        this.totalWords = this.typingValue.length;
        this.showCompleteBox = false;
        this.intervalTimer = setInterval(() => {
            if (this.currentLetters.length < this.exercise) {
                this.createElement();
            }
        }, 100);

        this.deleteTimer = setInterval(() => {
            this.currentLetters.forEach((element, index) => {
                if (element.del) {
                    this.currentLetters.splice(index, 1);
                    this.cLetters = this.cLetters.replace(this.cLetters[index], '');
                }
            });
        }, 100);
    }

    showTooltipBox() {
        this.showTooltipInfo = this.showTooltipInfo === true ? false : true;
    }

    
}
