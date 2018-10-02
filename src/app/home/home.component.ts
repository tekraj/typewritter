import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ApiService]
})
export class HomeComponent implements OnInit {
    public books: Array<{ id: number, name: string, desc: string }>;
    public lessions: Array<{ id: number, name: string, percent: number }>;
    public titles: Array<{ id: number, name: string, percent: number, grayPercent: number, yellowPercent: number, mode: number, type: Array<number>, content: string, topBarTitle: string, flagTitle: string,repeat:number }>;
    private bookId: number;
    public totalBooksPage: Array<number>;
    public copyBooks: Array<{ id: number, name: string, desc: string }>;
    public totalLessionPage: Array<number>;
    public totalTitlesPage: Array<number>;
    public currentLession: number;
    public pageContent: string;
    private loadingLession: boolean = false;
    private loadingEx: boolean = false;
    public showAllBooks: boolean = false;
    public currentBookIndex: number = 0;
    public totalExercisePage: Array<number>;
    public colorInfo: boolean = false;
    public currentLessionId: number;
    public studentName: string;
    public studentFirstName: string;
    public studentLastName: string;
    public mariaText:string;
    public showSaveExerciseButton = false;
    public showSaveExercisePopup = false;
    constructor(private _apiService: ApiService, private localStorageService: LocalStorageService) {
        this.books = [];
        this.lessions = [];
        this.titles = [];
        
    }

    ngOnInit() {
        this.studentName = this.localStorageService.select('std_name');
        this.studentFirstName = this.localStorageService.select('std_first_name');
        this.studentLastName = this.localStorageService.select('std_last_name');
        this.mariaText = 'Hello '+this.studentLastName+'! Wahle nun die Lektion aus!';
        let _currentBookIndex = this.localStorageService.select('currentBookIndex');
        let _lessions = this.localStorageService.select('homeLessions');
        let _homeBooks = this.localStorageService.select('homeBooks');
        if(_currentBookIndex && _lessions && _homeBooks){
            this.books = _homeBooks;
            this.currentBookIndex = _currentBookIndex;
            this.lessions = _lessions;
            this.copyBooks = this.books;
            this.totalBooksPage = Array(Math.ceil(this.books.length / 12)).fill(0).map((x, i) => i);
        }else{
            this.findBooks();
        }
        this.showSaveExerciseButton = this.localStorageService.select('betterExercise');
    }

    public findBooks = () => {
        this._apiService.getBooks().then((books) => {
            let ids = books[1].replace('a_lfdnr=', '').split('|');
            let allBooks = books[2].replace('a_name=', '').split('|');
            let allDesc = books[3].replace('a_bemerk=', '').split('|');
            allBooks.forEach((element, i) => {
                if (element != '0' && element != 0) {
                    this.books.push({id: ids[i], name: element, desc: allDesc[i]});
                }
            });
            this.copyBooks = this.books;
            this.totalBooksPage = Array(Math.ceil(this.books.length / 12)).fill(0).map((x, i) => i);
            this.localStorageService.insert('homeBooks',this.books);
            this.findLession(this.books[0].id, 0);
        });
    };

    public findLession = (bookId: number, currentBook: number) => {
        this.bookId = bookId;
        if (this.loadingLession) {
            return false;
        }
        this.currentBookIndex = currentBook;
        this.showAllBooks = false;
        this.localStorageService.insert('currentBookIndex',this.currentBookIndex);
        this.loadingLession = true;
        this.titles = [];
        this.lessions = [];
        this._apiService.getLessions(bookId).then((lessions) => {
            let ids = lessions[3].replace('lekt_nr=', '').split('|');
            let allLessions = lessions[4].replace('lekt_name=', '').split('|');
            let percentIndicators = lessions[5].replace('lekt_proz=', '').split('|');
            allLessions.forEach((element, i) => {
                if (element != '0' && element != 0) {
                    this.lessions.push({id: ids[i], name: element, percent: percentIndicators[i]});
                }
            });
            this.localStorageService.insert('homeLessions',this.lessions);
            this.totalLessionPage = Array(Math.ceil(this.lessions.length / 12)).fill(0).map((x, i) => i);
            this.loadingLession = false;
        });
    };

    findTitle(lessionId: number, currentLession: number) {
        if (this.loadingEx) {
            return false;
        }
        this.currentLessionId = lessionId;
        this.currentLession = currentLession;
        this.titles = [];
        this.loadingEx = true;
        this._apiService.getTitles(lessionId).then((titles) => {
            let ids = titles[2].replace('uebg_lfdnr=', '').split('|');
            let allTItles = titles[1].replace('uebg_titel=', '').split('|');
            let allPercents = titles[5].replace('uebg_proz=', '').split('|');
            let allGrayPercents = titles[6].replace('uebg_anschlag=', '').split('|');
            let allYellowPercents = titles[7].replace('uebg_takt=', '').split('|');
            let allNumbers = titles[4].replace('uebg_nr=','').split('|');
            let mods = titles[4];
           
            allTItles.forEach((element, i) => {
                if (element != '0' && element != 0) {
                    let mode = (mods.match(new RegExp(ids[i], 'g')) || []).length;
                    let percent,grayPercent,yellowPercent=0;
                    let id = ids[i];
                    if(mode>0){
                        let j = -1;
                        let percentArray=[];
                        let grayPercentArray=[];
                        let yellowPercentArray =[];
                        while ((j = allNumbers.indexOf(id, j+1)) != -1){
                            percentArray.push(allPercents[j]);
                            grayPercentArray.push(allGrayPercents[j]);
                            yellowPercentArray.push(allYellowPercents[j]);
                        }
                        percent=  Math.max(...percentArray);
                        grayPercent = Math.max(...grayPercentArray);
                        yellowPercent = Math.max(...yellowPercentArray);
                    }
                    /**
                     * type described
                     * 0. tastaturebereich (keyboard area)
                     * 1. Mode 
                     * 2. sgrad
                     * 3. rating
                     * 4. sound
                     * 5. Makeup
                     */

                    /**
                     * Mode Described
                     * 9 Information
                     * 0 Überschreiben (override) Example B1L1->U3
                     * 1 BST-dictation Random String Example B1 L1-U5
                     * 2 Dictation texts  Example  B2 L1-U14
                     * 3 search buttons Example B2 L1-U16
                     * 4 balloon B1 L1-U7
                     */

                    /**
                     * Sqrad Explained
                     * 1 Keyboard fittings Order & Icon Example B1 L1 U3
                     * 2 Letter and Icon Example B1 L2 U3
                     * 3 Letters Example  B1 L1 U 20
                     * 4 Icon 
                     */

                    /**
                     * Mode 0 1 B1 L1 U3 DONE
                     * Mode 0 2 B1 L1 U6 DONE
                     * Mode 0 3 B1 L13 U2 DONE
                     * Mode 0 4 B1 L2 U21 DONE
                     * ======================
                     * Mode 1 1 B1 L1 U5 DONE
                     * Mode 1 2 B1 L2 U5 DONE
                     * Mode 1 3 B4 L14 U2 DONE
                     * Mode 1 4 B4 L3 U3 DONE
                     * ======================
                     * Mode 2 1 
                     * Mode 2 2
                     * Mode 2 3
                     * Mode 2 4
                     * Mode 3 1
                     * Mode 3 2
                     * Mode 3 3
                     * Mode 3 4
                     * Mode 4 1
                     * Mode 4 2
                     * Mode 4 3
                     * Mode 4 4
                     */

                    this.titles.push({
                        id: id,
                        name: element,
                        percent: percent,
                        grayPercent: grayPercent,
                        yellowPercent: yellowPercent,
                        mode: mode,
                        type: [],
                        content: '',
                        topBarTitle: '',
                        flagTitle: '',
                        repeat : 1
                    });
                }
            });
            this._apiService.getExercise(lessionId).then((lessions) => {
                let lessionTypes = lessions[2].replace('uebg_opt=', '').split('|');
                let allTopTitles = lessions[4].replace('uebg_anw=', '').split('|');
                let allFlagTitles = lessions[5].replace('anw_mann=', '').split('|');
                let allContents = lessions[6].replace('uebg_text=', '').split('|');
                let contents = [];
                let repeat = [];
                for(let i in allContents){
                    let ct = allContents[i];
                    let repeatNo = parseInt(ct);
                    if(!isNaN(repeatNo) && ct.length<3){
                        repeat.push(repeatNo);
                    }else{
                        contents.push(ct);
                    }
                }
              
                lessionTypes.forEach((element, index) => {
                    if (index < this.titles.length) {
                        this.titles[index].type = element.split(',');
                       
                        if (index < allTopTitles.length) {
                            this.titles[index].topBarTitle = allTopTitles[index];
                        }
                        if (index < allFlagTitles.length) {
                            this.titles[index].flagTitle = allFlagTitles[index];
                        }
                        if (index < allContents.length) {
                            this.titles[index].content = contents[index];
                            this.titles[index].repeat = repeat[index];
                        }
                    }

                });
                this.localStorageService.insert('exerciseTitles', this.titles);
               
                this.totalTitlesPage = Array(Math.ceil((this.titles.length > 24 ? 24 : this.titles.length) / 12)).fill(0).map((x, i) => i);
                this.loadingEx = false;
            });
        });

    }

    showBookDropDown() {
        
        this.showAllBooks = this.showAllBooks === true ? false : true;
        if(this.showAllBooks){
            this.mariaText = 'Wahle nun das Ubungsbuch aus!'
        }else{
            this.mariaText = 'Wahle nun die Lektion!';
        }
    }


    public createArrayRange(inputArray, i) {
        let index = i + 1;
        let offset = (index - 1) * 12;
        let limit = index * 12 > inputArray.length ? inputArray.length : index * 12;
        let arrayPart = [];
        for (let a = offset; a < limit; a++) {
            var inArray = inputArray[a];
            if (typeof inArray === 'object') {
                arrayPart.push(inArray);
            }

        }

        return arrayPart;
    }
    showColorInfo() {
        this.colorInfo = this.colorInfo ? false : true;
    }
}
/*
uebg_text=Du befindest dich jetzt in einer ersten Lektion und der ersten Computerübung (Ü1).

<ul><li>Mit jeder folgenden Übung kannst du Dir in diesem Computerprogramm ein Bildchen verdienen und dieses in das Bilderalbum des Computerprogramms einkleben.

Achtung: nur wenn du ganz wenige, manchmal sogar keinen Fehler machst, dann bekommst du auch das Bild zum Einkleben im Computerprogramm.

Immer erst wenn 12 Übungen des Computerprogramms erfolgreich geschrieben sind, darfst du aus deinem Übungsbuch (aus Papier) die goldenen Medaille herausnehmen und in dein <b>Papiernotebuch</b> einkleben (siehe Erklärung im Übungsbuch Seite 7).

Natürlich darfst du als Fleißaufgabe die besonders schwierigen Übungen Ü13 bis zum Ende der Lektion auch noch schreiben.
</li></ul>

<p align="center">Nun klicke auf <b>Arbeit fortsetzen</b></p>
|1|<p align="center">Höre nun einmal auf die obigen Buchstaben</p>
<ul><li>
Man kann sich oft Dinge besser merken, wenn man Verbindungen zu Bekanntem oder Ähnlichem schafft - dies nennt man <b>Merkbrücken</b> oder <b>Eselsbrücken</b>.
Dies wird hier in diesem Programm mit Hilfe von Bildern und Sounds durchgeführt.
Du wirst für jede Buchstabentaste ein Bild erhalten - versuche dir bei jedem Bild die Lage der Taste auf der Tastatur vorzustellen.
Die ersten Übungen zum Tastaturschreiben sind mit diesen Bildern sehr stark verbunden.
Betrachte die obigen Bilder, sie gelten schon einmal für die Grundreihe. In der folgenden Übungen wirst du sie intensiv trainieren.
Bedenke den Anfangsbuchstaben und das entsprechende Bild.</li></ul>


gbild:griff_bilder2.swf|1|aaa sss ddd fff ggg fff ggg aaa ddd sss|1|aaa ddd ggg sss fff|2|asdfg|30|da da da das das das da das da das da|2|asdf|15|asdf|15|faa faa faa fas fas fas fada fada fada|1|a sdfg|15|gaa gaa gaa gas gas gas|2|gasa gada|5|sad sad sad sada saga|3|safa sasa|5|asdfg|25|asdfg|20|sad saga safa sasa sada fas fada das da gas gada saga fada safa sada gasa|3|asdfg|20|gaa gas fasa fada gasa gada da das gaa gas fasa fada gasa gada da das gas|5|asdfg|20|gaa gas fasa fada gasa gada da das gaa gas fasa fada gasa gada da das gas|50|gaa gas fasa fada gasa gada da das gaa gas fasa fada gasa gada da das gas|1|asdfg|20|<br><br><p align='center' >Mach es dir bequem auf deinem Sessel -<br> stelle deine Füße nebeneinander <br>und mit vollem Kontakt auf den Boden.<br>Zum Anhören der Geschichte, klicke den oberen roten Startbutton!</p><br>

gbild:zir_gr_li.swf|1|<br><br><p align='center' >Mach es dir bequem auf deinem Sessel -<br> stelle deine Füße nebeneinander <br>und mit vollem Kontakt auf den Boden.<br>Zum Anhören der Geschichte, klicke den oberen roten Startbutton!</p><br>

gbild:zir_gr_li.swf
<!-- kommentar: mann muss für jede mp3-datei eine swf-datei im bilderhordner haben!-->|1|0

*/ 