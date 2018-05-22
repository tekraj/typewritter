import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = 'http://mms.pphlinz.at/mms_flash_get_v15.php?';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { 

  }

  login(user:object) {
    return this.http.get(baseUrl+'flag=1&gnr=ch52ne&myVersion=8.0&api=1').toPromise();;
  }

  forgotPassword(email:string){
    return this.http.get(baseUrl+'flag=2&suchname=chandrantwins@gmail.com&api').toPromise();
  }

  getBooks(){
    return this.http.get(baseUrl+'flag=a&st_geg=68812&gnr=ch52ne&api=1').toPromise();
  }


  getLessions (bookId:number){
   return this.http.get(baseUrl+'flag=lekt&autor=732&lekt_nr=14&st_lfdnr='+bookId+'&api=1').toPromise();
  }

  getTitles(lessionId:number,bookId:number){
    return this.http.get(baseUrl+'flag=uebg_t&lekt_nr='+lessionId+'&st_lfdnr'+bookId+'&api=1').toPromise();
  }

  getExercise(titleId:number){
    return this.http.get(baseUrl+'flag=uebg&lekt_nr=14&api=1').toPromise();
  }

  setProt(){
    return this.http.get(baseUrl+'flag=set_rahm&startbild=1008&st_lfdnr=68812&api=1').toPromise();
  }

  setRahm(){
    return this.http.get(baseUrl+'flag=set_rahm&startbild=1008&st_lfdnr=68812&api=1').toPromise();
  }

}
