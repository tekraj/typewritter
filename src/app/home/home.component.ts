import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  public books: Array<{ id: number, name: string,desc:string }>;
  public lessions: Array<{ id: number, name: string }>;
  public titles: Array<{ id: number, name: string }>;
  public exercises: Array<{ id: number, name: string }>;
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
  constructor(private _apiService: ApiService) {
    this.books = [];
    this.lessions = [];
    this.titles = [];
   this.exercises = [];
    
  }

  ngOnInit() {
    this.findBooks();
  }

  public findBooks = ()=>{
    this._apiService.getBooks().then((books) => {
      let ids = books['1'].replace('a_lfdnr=', '').replace('0', '').split('|');
      let allBooks = books['2'].replace('a_name=chandran nepolean|', '').replace('0', '').split('|');
      let allDesc = books['3'].replace('a_bemerk=|', '').replace('0', '').split('|');
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
   this.exercises = [];
    this._apiService.getLessions(bookId).then((lessions) => {
      console.log(lessions);
      let ids = lessions['3'].replace('lekt_nr=', '').replace('0', '').split('|');
      let allLessions = lessions['4'].replace('lekt_name=', '').replace('0', '').split('|');
      allLessions.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.lessions.push({ id: ids[i], name: element });
        }
      });
      this.totalLessionPage = Array(Math.ceil(this.lessions.length / 12)).fill(0).map((x,i)=>i);
      this.loadingLession = false;
    })
  }
 
  findTitle(lessionId: number,currentLession) {
    if (this.loadingEx) {
      return false;
    }
    this.currentLession = currentLession;
    this.titles = [];
    this.exercises = [];
    this.loadingEx = true;
    this._apiService.getTitles(lessionId, this.bookId).then((titles) => {
  
      let ids = titles[2].replace('uebg_lfdnr=', '').replace('0', '').split('|');
      let allTItles = titles[1].replace('uebg_titel=', '').replace('0', '').split('|');
      allTItles.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.titles.push({ id: ids[i], name: element });
        }
      });
      this.totalTitlesPage = Array(Math.ceil(this.titles.length/12) ).fill(0).map((x,i)=>i);
      this.loadingEx = false;
    })
  }
  
  getExercise(titleId:number){
    if (this.loadingEx) {
      return false;
    }
    this.exercises = [];
    this.loadingEx = true;
    this._apiService.getExercise(titleId).then((titles) => {
  
      let ids = titles[2].replace('a_uebg_lfdnr=', '').replace('0', '').split('|');
      let allTItles = titles[4].replace('uebg_titel=', '').replace('0', '').split('|');
      allTItles.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.exercises.push({ id: ids[i], name: element });
        }
      });
      this.totalExercisePage = Array(Math.ceil(this.exercises.length/12) ).fill(0).map((x,i)=>i);
      this.loadingEx = false;
    })
  }

  getPageContent(exerciseId:number){
    this._apiService.getExercise(exerciseId).then((content)=>{
      this.pageContent = content[4];
    });
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
