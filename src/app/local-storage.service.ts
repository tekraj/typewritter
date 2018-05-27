import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }
  public insert = (key: string, data: {}) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  public select = (key: string) => {
    let rawData = localStorage.getItem(key);
    if (rawData == null || rawData == '' || rawData == 'null')
      return false;
    return JSON.parse(rawData);
  };
}
