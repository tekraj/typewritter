import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Howl, Howler } from 'howler';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css'],
    host: {
        '(document:keydown)': 'handleKeyDownEvent($event)',
        '(document:keyup)': 'handleKeyUpEvent($event)',
        '(document:mouseup)': 'handleMouseUpEvent($event)',
    },
    providers: [{ provide: 'Window', useValue: window }],
    animations: [
        trigger('ballonState', [
            state('inactive', style({
                bottom: '20px'
            })),
            state('preactive', style({
                bottom: '-20px'
            })),
            state('active', style({
                transform: 'translateY(-34vh)'
            })),
            transition('preactive => active', animate('10000ms linear'))
        ])
    ]
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
    public currentExercise: any;
    public keyValue: any;
    public keyboard: any = {};
    public typedString: string = '';

    public letterTypedIndex: number;
    public letterNextTyped: number = 0;
    public currentLetterImage: string;
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
    public currentSoundLevel = 0;
    public metroSound = 'Metro aus';
    public backgroundSound: any;
    public totalWidth: number;
    public totalWordWidth: number;
    public textLeftMove = 0;
    public showHeaderText = false;
    public settingMode: string;
    public globalSettings: any;
    private internalTypingTime: number = 1;
    public typingTime: number = 0;
    private typingCounter: any;
    public typingSpeed: number = 0;
    public totalAccuracy: number = 0;
    public exerciseCompleted: number = 0;

    //variables for animation ballons
    public currentLettersArray: Array<{ letter: string, del: boolean, animation: boolean, left: number, initial: boolean }>;
    public currentLetters = '';
    public remainingText = '';
    public exerciseParams: any;
    public practiceMode: number;
    public grid: number;
    public zoomButtonAnimation = false;
    public typeThisLetter = '';
    public remainingValue = [];
    public letterIndexes = {};
    public typeThisImage = '';
    public typeThisLetterClass = '';
    public showZoomAnimation: boolean = true;
    public letterClasses: Array<{ class: string, letters: Array<string> }>;
    public animationMode = 'letter';
    public currentExerciseImage = '';
    public betterPerformance = false;
    constructor(private _apiService: ApiService, private localStorageService: LocalStorageService, private route: ActivatedRoute, private router: Router) {
        this.exerciseParams = this.route.params['value'];
        this.currentLessionIndex = parseInt(this.exerciseParams.lessionIndex);
        this.exercises = this.localStorageService.select('exerciseTitles');
        this.letterIndexes = { "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57, "a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72, "i": 73, "j": 74, "k": 75, "l": 76, "m": 77, "n": 78, "o": 79, "p": 80, "q": 81, "r": 82, "s": 83, "t": 84, "u": 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90, "Shift": 16, "~": 192, "`": 192, "!": 49, "@": 50, "#": 51, "$": 52, "%": 53, "^": 54, "&": 55, "*": 56, "(": 57, ")": 48, "_": 189, "+": 187, "|": 220, "}": 221, "{": 219, "]": 221, "[": 219, "'": 222, ";": 186, ":": 186, "\"": 222, ">": 190, "<": 188, ",": 188, ".": 190, "?": 191, "/": 191 };
        this.letterClasses = [{ class: 'primary', letters: ['a', 'q', 'z', '1', , '!', '2', '"', 'ß', '?', '´', '`', 'p', 'ü', '-', '_', 'ö', 'ä'] },
        { class: 'warning', letters: ['3', '§', 'w', 's', 'x', '0', '=', 'o', 'l', ':', '.'] },
        { class: 'success', letters: ['4', '$', '9', ')', 'i', 'k', ';', ',', 'd', 'e'] },
        { class: 'danger', letters: ['5', '%', '5', '&', '7', '/', '8', '(', 'r', 't', 'y', 'u', 'f', 'g', 'h', 'j', 'v', 'b', 'n', 'm'] }];
        this.currentExercise = this.exercises[this.currentLessionIndex];
        this.globalSettings = this.localStorageService.select('globalSettings');
        this.settingMode = this.localStorageService.select('settingMode');
    }

    private setUpExercise() {
        this.headerHide = true;
        this.zoomButtonAnimation = false;
        this.showHeaderText = false;
        this.totalAccuracy = 0;
        this.typingSpeed = 0;
        this.typingTime = 0;
        this.currentExercise = this.exercises[this.currentLessionIndex];
        this.practiceMode = this.currentExercise.type[1];
        this.grid = this.currentExercise.type[2];
        if (this.grid > 5) {
            this.animationMode = 'icon';
        }
        this.grid = this.grid > 5 ? 1 : this.grid;

        this.typeSettings = { stringLength: this.currentExercise.repeat, value: this.currentExercise.content, typewriterMode: '', presentation: 0, sound: 'kein_sound', soundVolume: 50, muteSound: false };
        let settings = this.localStorageService.select('typeSettings');
        if (settings && settings.soundVolume) {
            this.typeSettings.soundVolume = settings.soundVolume;
        } else {
            this.typeSettings.soundVolume = 50;
        }
        this.typeSettings.value = this.typeSettings.value.replace('/\s+/', ' ');
        this.currentSoundLevel = this.typeSettings.soundVolume;
        for (let i = 1; i <= this.typeSettings.stringLength; i++) {
            this.typingValue += this.typeSettings.value + ' ';

        }
        if (this.practiceMode !== 1) {
            this.typeSettings.value = this.typeSettings.value.replace(/\s/g, '');
            this.typingValue = this.typingValue.replace(/\s/g, '')
        }
        this.remainingText = this.typingValue;

        this.keyboard.typingValue = this.typingValue.trim().split('');
        this.totalWords = this.typingValue.length;
        this.remainingValue = this.keyboard.typingValue;

        this.clickWrongSound = new Howl({
            src: ['../assets/sounds/wrong-click.mp3']
        });

        Howler.volume(this.typeSettings.soundVolume / 100);
        let sounds = ['kein_sound', 'click', 'bst', 'icon', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5', 'hg6', 'hg7', 'hg8', 'hg9'];
        this.typeSettings.sound = sounds[this.currentExercise.type[4]];
        this.setSound(this.typeSettings.sound);
        this.totalWordWidth = 15 * this.keyboard.typingValue.length;

        this.currentLettersArray = [];
        //script for ballon animations
        if (this.practiceMode == 4) {
            for (let i = 1; i <= this.grid; i++) {
                this.currentLettersArray.push(this.createElement(i, true));
            }
        }

        setTimeout(() => {
            this.headerHide = false;
            this.zoomButtonAnimation = true;
        }, 50);
        setTimeout(() => {
            this.showHeaderText = true;
        });
        this.checkLetterExists();
    }

    ngOnInit() {
        this.totalWidth = window.innerWidth - 80;
        this.setUpExercise();
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
            Howler.volume(0);
            this.typeSettings.soundVolume = 0;
        } else {
            this.typeSettings.soundVolume = this.currentSoundLevel;
            Howler.volume(this.typeSettings.soundVolume / 100);
        }
        this.localStorageService.insert('typeSettings', this.typeSettings);
    };

    writeText(normal: string, shiftKey = '', ctrlKey = '', altKey = '') {
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
        if (event.key == 'Shift' || event.key == 'Control' || event.key == 'AltLeft' || event.key == 'ShiftRight' || event.key == 'ControlRight' || event.key == 'AltRight') {
            return true;
        }

        if (this.practiceMode == 0 || this.practiceMode == 2) {
            let keySettings = this.globalSettings[event.keyCode];
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
                if (this.totalRight * 15 > this.totalWidth) {
                    this.textLeftMove = this.totalWidth - (this.totalRight * 15);
                }

                if (this.practiceMode == 0) {
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
                    this.letterNextTyped = this.typedString.length;
                    this.typeThisLetter = this.keyboard.typingValue[this.typedString.length];
                    let letterIndex = this.letterIndexes[this.typeThisLetter];
                  
                    let nextKeyCode;
                    if (letterIndex < 64) {
                        nextKeyCode = letterIndex;
                    } else {
                        nextKeyCode = letterIndex + 32;
                    }
                    this.totalRight++;
                    this.typeThisImage = '../assets/images/typer/' + this.settingMode + 'b_' + + nextKeyCode + '.jpg';
                    let nextSetting = this.globalSettings[letterIndex];
                    this.typeThisLetterClass = nextSetting.cssClass;

                    if (this.clickRightSound) {
                        if (this.clickRightSound == 'click') {
                            let clickSound = new Howl({
                                src: ['../assets/sounds/right-click.mp3']
                            });
                            clickSound.play();
                        } else if (this.clickRightSound == 'play-letter') {
                            let sound = '../assets/sounds/' + this.settingMode + 's_' + keyCode + '.mp3'
                            if (this.grid == 1 || this.grid == 5) {
                                sound = '../assets/sounds/' + this.settingMode + 's_' + nextKeyCode + '.mp3'
                            }
                            let clickSound = new Howl({
                                src: [sound]
                            });
                            clickSound.play();
                        } else if (this.clickRightSound == 'icon-sound') {
                            let sound = '../assets/sounds/icon-sound/w_' + keySettings.tast_wort + '.mp3'
                            if (this.grid == 1 || this.grid == 5) {
                                sound = '../assets/sounds/icon-sound/w_' + nextSetting.tast_wort + '.mp3'
                            }
                            let clickSound = new Howl({
                                src: [sound]
                            });
                            clickSound.play();
                        }
                    }


                }
            } else {
                this.clickWrongSound = new Howl({
                    src: ['../assets/sounds/wrong-click.mp3']
                });
                this.clickWrongSound.play();
                this.totalWrong++;
            }
        } else if (this.practiceMode == 1) {
            if (this.keyValue == this.typeThisLetter) {
                this.totalRight++;
                let typedIndex = this.remainingValue.indexOf(this.keyValue);
                this.remainingValue.splice(typedIndex, 1);
                let randString = Math.floor(Math.random() * this.remainingValue.length);
                this.typeThisLetter = this.remainingValue[randString];
                let letterIndex = this.letterIndexes[this.typeThisLetter];
                let nextKeyCode;
                if (letterIndex < 64) {
                    nextKeyCode = letterIndex;
                } else {
                    nextKeyCode = letterIndex + 32;
                }

                this.typeThisImage = '../assets/images/typer/' + this.settingMode + 'b_' + + nextKeyCode + '.jpg';

                let nextSetting = this.globalSettings[letterIndex];
                this.typeThisLetterClass = nextSetting.cssClass;

                if (this.clickRightSound) {
                    if (this.clickRightSound == 'click') {
                        let clickSound = new Howl({
                            src: ['../assets/sounds/right-click.mp3']
                        });
                        clickSound.play();
                    } else if (this.clickRightSound == 'play-letter') {
                        let clickSound = new Howl({
                            src: ['../assets/sounds/' + this.settingMode + 's_' + nextKeyCode + '.mp3']
                        });
                        clickSound.play();
                    } else if (this.clickRightSound == 'icon-sound') {

                        let clickSound = new Howl({
                            src: ['../assets/sounds/icon-sound/w_' + nextSetting.tast_wort + '.mp3']
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
        } else if (this.practiceMode == 4) {
            let keySettings = this.globalSettings[event.keyCode];
            if (this.currentLetters.indexOf(this.keyValue) >= 0) {
                this.remainingText.replace(this.keyValue, '');
                let keyCode = event.keyCode < 64 ? event.keyCode : (event.keyCode + 32);
                this.currentLetterImage = '../assets/images/typer/' + this.settingMode + 'b_' + + keyCode + '.jpg';
                this.currentTypedLetter = this.keyValue;
                this.totalRight++;

                this.removeElement(this.keyValue);
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
            let mod = this.currentExercise.id % 71;
            let type = (this.totalAccuracy < 60 ? 0 : ((this.totalAccuracy >= 60 && this.totalAccuracy < 100) ? 1 : 2));
            this.currentExerciseImage = '../assets/images/alb/i_0' + (mod < 10 ? '0' + mod : mod) + '_' + type + '.jpg'
            this.showCompleteBox = true;
            if (this.totalAccuracy == 100) {
                this.betterPerformance = true;
            }
        }
    }

    handleKeyUpEvent(event: KeyboardEvent) {
        this.keyValue = 'test';
    }
    handleMouseUpEvent(event: MouseEvent) {
        this.keyValue = 'test';
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


    repeatExercise() {
        this.showCompleteBox = false;
        this.setUpExercise();

    }

    setNextPractice() {
        this.showCompleteBox = false;
        this.currentLessionIndex = this.currentLessionIndex + 1;
        if (this.currentLessionIndex >= this.exercises.length) {
            this.currentLessionIndex = 0;
        }
        this.setUpExercise();
    }

    showTooltipBox() {
        this.showTooltipInfo = this.showTooltipInfo === true ? false : true;
    }

    nagivateFunction(link) {
        Howler.unload();
        this.router.navigate([link]);
    }




    private createElement(index, initial: boolean) {
        let randomNo = Math.floor(Math.random() * this.remainingText.length) + 0;
        let letter = this.remainingText[randomNo];
        let totalArrayLength = this.grid + (initial ? 0 : 1);
        this.currentLetters += letter;
        let left = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
        let lastIndex = this.currentLettersArray.length - 1;
        if (!initial) {
            setTimeout(() => {
                this.currentLettersArray[index].animation = true;
            }, 100);
        }
        return { letter: letter, animation: false, left: left, del: false, initial: initial };
    }



    public removeElement(letter) {
        for (let i = 0; i < this.currentLettersArray.length; i++) {
            if (this.currentLettersArray[i].letter === letter) {
                this.currentLetters = this.replaceAt(i, letter, this.currentLetters);
                this.currentLettersArray.splice(i, 1, this.createElement(i, false));
                break;
            }
        }
    }

    public removeElementByAnimation(event, index: number, letter: string, initial: boolean) {
        if (!initial && event.toState == 'active') {
            this.currentLetters = this.replaceAt(index, letter, this.currentLetters);
            this.currentLettersArray.splice(index, 1, this.createElement(index, false));

        }
    }

    private replaceAt(index, char, str) {
        var a = str.split("");
        a[index] = char;
        return a.join("");
    }

    private checkLetterExists() {
        let mainLeft = 'asdfg';
        let mainRight = 'hjklö';
        let main = mainLeft + mainRight;
        let topLeft = 'qwert';
        let topRight = 'zuiop';
        let top = topLeft + topRight;
        let bottomLeft = 'yxcvb';
        let bottomRight = 'nm,.-';
        let bottom = bottomLeft + bottomRight;
        let numberLetf = '123456';
        let numberRight = '7890ß';
        let symbols = '!"§$%&+`´#*\'^°'
        let numberRow = numberLetf + numberRight;
        let showTopLeft, showTop, showMainLeft, showMain, showBottomLeft, showBottom, showNumberLeft, showNumber;

        for (let i = 0; i < this.typingValue.length; i++) {
            let char = this.typingValue[i];
            if (symbols.indexOf(char) > 0) {
                showMain = true;
                showTop = true;
                showBottom = true;
                showNumber = true;
                break;
            }
            if (mainRight.indexOf(char) >= 0) {
                showMain = true;
            } else if (mainLeft.indexOf(char) >= 0) {
                showMainLeft = true;
            } else if (topRight.indexOf(char) >= 0) {
                showMain = true;
                showTop = true;
            } else if (topLeft.indexOf(char) >= 0) {
                showMain = true;
                showTopLeft = true;
            } else if (bottomRight.indexOf(char) >= 0) {
                showMain = true;
                showTop = true;
                showBottom = true;
            } else if (bottomLeft.indexOf(char) >= 0) {
                showMain = true;
                showTop = true;
                showBottomLeft = true;
            } else if (numberRight.indexOf(char) >= 0) {
                showMain = true;
                showTop = true;
                showBottom = true;
                showNumber = true;
            } else if (numberLetf.indexOf(char) >= 0) {
                showMain = true;
                showTop = true;
                showBottom = true;
                showNumberLeft = true;
            }
        }
        if (showMain) {
            for (let i in this.globalSettings.row2) {
                this.globalSettings.row2[i].visible = true;
            }
        } else {
            for (let i = 0; i < 5; i++) {
                this.globalSettings.row2[i].visible = true;
            }
        }
        if (showTop) {
            for (let i in this.globalSettings.row3) {
                this.globalSettings.row3[i].visible = true;
            }
        } else if (showTopLeft) {
            for (let i = 0; i < 5; i++) {
                this.globalSettings.row3[i].visible = true;
            }
        }

        if (showBottom) {
            for (let i in this.globalSettings.row1) {
                this.globalSettings.row1[i].visible = true;
            }
        } else if (showBottomLeft) {
            for (let i = 0; i < 5; i++) {
                this.globalSettings.row1[i].visible = true;
            }
        }
        if (showNumber) {
            for (let i in this.globalSettings.row4) {
                this.globalSettings.row4[i].visible = true;
            }
        } else if (showNumberLeft) {
            for (let i = 0; i < 5; i++) {
                this.globalSettings.row4[i].visible = true;
            }
        }
    }

    hideZoomAnimation() {
        this.showZoomAnimation = false;
        if (this.practiceMode == 1) {
            Howler.volume(0.5);
            this.typeSettings.soundVolume = 50;
            let randString = Math.floor(Math.random() * this.remainingValue.length);
            this.typeThisLetter = this.remainingValue[randString];
            let letterIndex = this.letterIndexes[this.typeThisLetter];
            let nextKeyCode;
            if (letterIndex < 64) {
                nextKeyCode = letterIndex;
            } else {
                nextKeyCode = letterIndex + 32;
            }
            this.typeThisImage = '../assets/images/typer/' + this.settingMode + 'b_' + + nextKeyCode + '.jpg';
            let nextSetting = this.globalSettings[letterIndex];
            this.typeThisLetterClass = nextSetting.cssClass;

            let clickSound = new Howl({
                src: ['../assets/sounds/icon-sound/w_' + nextSetting.tast_wort + '.mp3']
            });
            clickSound.play();
        }
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
    getIcon(letter) {
        let letterIndex = this.letterIndexes[this.typeThisLetter];
        let nextKeyCode;
        if (letterIndex < 64) {
            nextKeyCode = letterIndex;
        } else {
            nextKeyCode = letterIndex + 32;
        }
        return '../assets/images/typer/' + this.settingMode + 'b_' + + nextKeyCode + '.jpg';
    }

    nextExercise() {
        this.showCompleteBox = false;
        this.currentLessionIndex = this.currentLessionIndex + 1;
        if (this.currentLessionIndex >= this.exercises.length) {
            this.currentLessionIndex = 0;
        }
        this.setUpExercise();
    }

    prevExercise() {
        this.showCompleteBox = false;
        this.currentLessionIndex = this.currentLessionIndex - 1;
        if (this.currentLessionIndex <= 0) {
            this.currentLessionIndex = this.exercises.length - 1;
        }
        this.setUpExercise();
    }

    saveExercisePerformance() {
        // if (this.totalAccuracy >= this.currentExercise.percent && this.totalAccuracy >= this.currentExercise.grayPercent) {
        if (1 == 1) {
            let betterExercises = this.localStorageService.select('betterExercises');
            if (!betterExercises) {
                betterExercises = [];
            }
            betterExercises.push(this.currentExercise);
            this.localStorageService.insert('betterExercises', betterExercises);
        }
        this.router.navigate(['home']);
    }

    saveImageToGallery() {
        this.localStorageService.insert('currentExercise', this.currentExercise);
        this.router.navigate(['gallery']);
    }
}

