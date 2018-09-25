import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import { callbackify } from 'util';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const baseUrl = '/get-data?';
// const settingUrl = '/get-settings';
const baseUrl = 'http://mms.pphlinz.at/mms_flash_get_v15.php?';
const settingUrl =  'http://keyboard.fadsan.com/apiservices.php?action=getSettings';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public stGet : number;
  public  stLnfdnr : number;
  
  constructor(private http:HttpClient,private localStorageService:LocalStorageService) { 
    this.stGet = this.localStorageService.select('gegenstand');
    this.stLnfdnr = this.localStorageService.select('st_lfdnr');
  }

  login(user:object) {
    return this.http.get(baseUrl+'flag=1&gnr=ms&myVersion=8.0&api=1').toPromise();;
  }

  resetPassword(email:string){
    return this.http.get(baseUrl+'flag=2&suchname='+email+'&api').toPromise();
  }

  getBooks(){
    return this.http.get(baseUrl+'flag=a&st_geg='+this.stGet+'&gnr=ms&api=1').toPromise();
  }


  getLessions (bookId:number){
   return this.http.get(baseUrl+'flag=lekt&autor='+bookId+'&st_lfdnr='+this.stLnfdnr+'&api=1').toPromise();
  }

  getTitles(lessionId:number){
    return this.http.get(baseUrl+'flag=uebg_t&lekt_nr='+lessionId+'&st_lfdnr='+this.stLnfdnr+'&api=1').toPromise();
  }

  getExercise(lessionId:number){   
    return this.http.get(baseUrl+'flag=uebg&lekt_nr='+lessionId+'&st_lfdnr='+this.stLnfdnr+'&api=1').toPromise();
  }

  setProt(){
    return this.http.get(baseUrl+'flag=set_rahm&startbild=1008&st_lfdnr=68812&api=1').toPromise();
  }

  setRahm(){
    return this.http.get(baseUrl+'flag=set_rahm&startbild=1008&st_lfdnr=68812&api=1').toPromise();
  }

  getSetting(callback:any){
    this.http.get(settingUrl,{ responseType: 'text' }).subscribe(data=>{
      return callback(JSON.parse(data));
    });
  }

}
