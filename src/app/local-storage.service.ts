import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }
  public insert = (key: string, data: {}) => {
    if(typeof data=='object' ){
      localStorage.setItem(key, JSON.stringify(data));
    }else{
      localStorage.setItem(key,data);
    }
     
  };

  public select = (key: string) => {
    let rawData = localStorage.getItem(key);
    if (rawData == null || rawData == '' || rawData == 'null')
      return false;
    let data:any;
    try{
      data = JSON.parse(rawData);
    }catch(e){
      data = rawData;
    }
    return data;
  };
}
