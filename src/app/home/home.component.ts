import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  public books: Array<{ id: number, name: string }>;
  public lessions: Array<{ id: number, name: string }>;
  public titles: Array<{ id: number, name: string }>;
  private bookId: number;
  public totalBooksPage: Array<number>;
  public totalLessionPage: Array<number>;
  public totalTitlesPage : Array<number>;
  public currentBook : number;
  public currentLession : number;
  public pageContent : string;

  constructor(private _apiService: ApiService) {
    this.books = [];
    this.lessions = [];
    this.titles = [];
   
    
  }

  ngOnInit() {
    this._apiService.getBooks().then((books) => {
      let ids = books['1'].replace('a_lfdnr=', '').replace('0', '').split('|');
      let allBooks = books['2'].replace('a_name=', '').replace('0', '').split('|');
      allBooks.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.books.push({ id: ids[i], name: element });
        }
      });
      this.totalBooksPage = Array(Math.ceil(this.books.length/12)).fill(0).map((x,i)=>i);
    })
  }

  private loadingLession: boolean = false;
  findLession(bookId: number,currentBook:number) {
    this.bookId = bookId;
    if (this.loadingLession) {
      return false;
    }
    this.currentBook = currentBook;
    this.titles = [];
    this.loadingLession = true;
    this.lessions = [];
    this._apiService.getLessions(bookId).then((lessions) => {
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

  private loadingEx: boolean = false;
  findExerciseTitle(lessionId: number,currentLession) {
    if (this.loadingEx) {
      return false;
    }
    this.currentLession = currentLession;
    this.titles = [];
    this.loadingEx = true;
    this._apiService.getExerciseTitles(lessionId, this.bookId).then((titles) => {
  
      let ids = titles[2].replace('uebg_lfdnr=', '').replace('0', '').split('|');
      let allTItles = titles[1].replace('uebg_titel=', '').replace('0', '').split('|');
      allTItles.forEach((element, i) => {
        if (element != '0' && element != 0) {
          this.titles.push({ id: ids[i], name: element });
        }
      });
      this.totalTitlesPage = Array(Math.ceil(this.titles.length/12)>2 ? 2 :Math.ceil(this.titles.length/12) ).fill(0).map((x,i)=>i);
      this.loadingEx = false;
    })
  }

  getPageContent(titleId:number){
    this._apiService.getExercise(titleId).then((content)=>{
      this.pageContent = content[4];
    });
  }

}
