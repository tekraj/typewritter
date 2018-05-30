import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {LocalStorageService} from '../local-storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  public books: Array<{ id: number, name: string,desc:string }>;
  public lessions: Array<{ id: number, name: string,percent:number }>;
  public titles: Array<{ id: number, name: string, percent:number,grayPercent:number,yellowPercent:number,mod:number }>;

  private bookId: number;
  public totalBooksPage: Array<number>;
  public copyBooks: Array<{ id: number, name: string,desc:string }>;
  public totalLessionPage: Array<number>;
  public totalTitlesPage : Array<number>;
  public currentLession : number;
  public pageContent : string;
  private loadingLession: boolean = false;
  private loadingEx: boolean = false;
  public showAllBooks : boolean = false;
  public currentBookIndex:number = 0;
  public totalExercisePage : Array<number>;
  public colorInfo : boolean = false;
  public currentLessionId : number;
  public studentName : string;
  public studentFirstName:string;
  public studentLastName:string;
  constructor(private _apiService: ApiService, private localStorageService:LocalStorageService) {
    this.books = [];
    this.lessions = [];
    this.titles = [];

    
  }

  ngOnInit() {
    this.findBooks();
    this.studentName = this.localStorageService.select('std_name');
    this.studentFirstName = this.localStorageService.select('std_first_name');
    this.studentLastName = this.localStorageService.select('std_last_name');
   
  }

  public findBooks = ()=>{
    this._apiService.getBooks().then((books) => {
      let ids = books[1].replace('a_lfdnr=', '').split('|');
      let allBooks = books[2].replace('a_name=', '').split('|');
      let allDesc = books[3].replace('a_bemerk=', '').split('|');
      allBooks.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.books.push({ id: ids[i], name: element,desc:allDesc[i] });
        }
      });
      this.copyBooks = this.books;
      this.totalBooksPage = Array(Math.ceil(this.books.length/12)).fill(0).map((x,i)=>i);
      this.findLession(this.books[0].id,0);
    })
  }
  
  public findLession = (bookId: number,currentBook:number)=> {
    this.bookId = bookId;
    if (this.loadingLession) {
      return false;
    }
    this.currentBookIndex = currentBook;
    this.showAllBooks = false;
    
    this.loadingLession = true;
    this.titles = [];
    this.lessions = [];
    this._apiService.getLessions(bookId).then((lessions) => {
      let ids = lessions[3].replace('lekt_nr=', '').split('|');
      let allLessions = lessions[4].replace('lekt_name=', '').split('|');
      let percentIndicators = lessions[5].replace('lekt_proz=','').split('|');
      
      allLessions.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.lessions.push({ id: ids[i], name: element,percent:percentIndicators[i] });
        }
      });
      this.totalLessionPage = Array(Math.ceil(this.lessions.length / 12)).fill(0).map((x,i)=>i);
      this.loadingLession = false;
    })
  }
 
  findTitle(lessionId: number,currentLession:number) {
   
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
      let allPercents = titles[5].replace('uebg_proz=','').split('|');
      let allGrayPercents = titles[6].replace('uebg_anschlag=','').split('|');
      let allYellowPercents = titles[7].replace('uebg_takt=','').split('|');
      let mods = titles[3].replace('uebg_modus=','').split('|');
      allTItles.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.titles.push({ id: ids[i], name: element,percent:allPercents[i],grayPercent:allGrayPercents[i],yellowPercent:allYellowPercents[i],mod:mods[i] });
        }
      });
      this.totalTitlesPage = Array(Math.ceil(this.titles.length/12) ).fill(0).map((x,i)=>i);
      this.loadingEx = false;
    })
  }
  
  



  showBookDropDown (){
    this.showAllBooks = this.showAllBooks===true ? false : true;
  }


  public createArrayRange(inputArray,i){
    let index = i+1;
    let offset = (index-1)*12;
    let limit = index*12 > inputArray.length ? inputArray.length : index*12;
    let arrayPart = [];
    for(let a=offset;a<=limit;a++){
      var inArray = inputArray[a];
      if(typeof inArray ==='object'){
        arrayPart.push(inArray);
      }
        
    }
    
    return arrayPart;
  }


  showColorInfo(){
    this.colorInfo = this.colorInfo ? false : true;
  }
}
