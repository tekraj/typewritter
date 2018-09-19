import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-module',
    templateUrl: './module.component.html',
    styleUrls: ['./module.component.css'],
    providers: [LocalStorageService]
})
export class ModuleComponent implements OnInit {
    public typeSettings: any = {};
    public currentType: number = 0;
    public typeButtonNo: number = 0;
    public typeClicked: number = 1;
    public tasterButton: number = 0;

    constructor(private localStorageService: LocalStorageService, private router: Router) {
        let settingData = localStorageService.select('typeSettings');
        if (settingData === false) {
            this.typeSettings = {
                stringLength: 10,
                value: 'asdfghjklö',
                typewriterMode: 'sm',
                presentation: 0,
                sound: 'kein_sound',
                soundVolume: 1,
                muteSound: false
            };
        } else {
            this.typeSettings = settingData;

        }
    }

    ngOnInit() {
    }


    setTypeValue = (value: string, type: number, tBNo: number) => {
        this.tasterButton = tBNo;
        if(this.typeButtonNo === tBNo){
            return false;
        }
        this.typeButtonNo = tBNo;

        if (this.currentType == type) {
            if (this.typeButtonNo%2==0) {
                this.typeClicked++;
                this.typeSettings.value += value;
            }else{
                this.typeClicked = 1;
                this.currentType = type;
                this.typeSettings.value = value;
            }

        } else {
            this.typeClicked = 1;
            this.currentType = type;
            this.typeSettings.value = value;
        }
    };


    setWorkingMode = (mode: string) => {
        this.typeSettings.typewriterMode = mode;
    };
    setPresentation = (presentation: number) => {
        this.typeSettings.presentation = presentation;
    };

    setStringLength(stringLength: number) {
        this.typeSettings.stringLength = stringLength;
    }

    setSound(value: string) {
        this.typeSettings.sound = value;
    }

    saveSettings() {
        let indexArray = ['one', 'two', 'three', 'four', 'five'];
        let type = indexArray[this.typeSettings.presentation - 1];
        type = (type && type.length>2) ? type : 'one';
        let redirectUrl = 'typewriter-' + this.typeSettings.typewriterMode + '/' + type;
        this.localStorageService.insert('typeSettings', this.typeSettings);
        this.router.navigate([redirectUrl]);
    }
}
