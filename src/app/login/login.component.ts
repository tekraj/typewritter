import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  public loginProgress: boolean = false;
  public message: string = '';
  public settingMode = 'a';


  constructor(private route: ActivatedRoute, private router: Router, private _apiService: ApiService, private localStorage: LocalStorageService) {
    this.model.password = 'ms';
  }

  login() {
    this.message = 'Herstellung der internetverbindung bitte warten';
    this.loginProgress = true;
    this._apiService.login(this.model).then((data: any) => {
      let gegenstand = data[5].replace('gegenstand=', '');
      let st_lfdnr = data[1].replace('st_lfdnr=', '');
      let studentName = data[3].replace('stname=', '');
      this.localStorage.insert('gegenstand', gegenstand)
      this.localStorage.insert('st_lfdnr', st_lfdnr)
      this.localStorage.insert('std_name', studentName);
      if (studentName) {
        let stdNameArray = studentName.split(' ');
        if (stdNameArray.length > 1) {
          this.localStorage.insert('std_first_name', stdNameArray[0]);
          this.localStorage.insert('std_last_name', stdNameArray[1]);
        } else {
          this.localStorage.insert('std_first_name', stdNameArray[0]);
          this.localStorage.insert('std_last_name', stdNameArray[0]);
        }
      }
      this.localStorage.insert('settingMode', this.settingMode);
      this.importSettings();
      this.router.navigate([this.returnUrl]);
    });
  }

  resetPassword() {
    this.loginProgress = true;
    if (this.isValidEmail(this.model.email)) {
      this._apiService.resetPassword(this.model.email).then((response) => {
        this.message = response['1'].replace('stname=', '');
      });

    } else {
      this.message = 'Keine Email-Addresse eingegeben';
    }
  }

  public isValidEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  ngOnInit() {
    this.returnUrl = 'home';
  }

  private importSettings() {
    this._apiService.getSetting(data => {
      this.settingMode = data.settingMode;
      let setting: { [k: string]: any } = {};
      let textSetting = data.settingData.split('&');
      textSetting.forEach(element => {
        if (element && element.trim().length > 2) {
          let singleSetting = element.split('=');
          setting[singleSetting[0]] = singleSetting[1].split(',');
        }
      });
      let globalSettings: { [k: string]: any } = {};
      globalSettings.row1 = [];
      globalSettings.row2 = [];
      globalSettings.row3 = [];
      globalSettings.row4 = [];
      if (setting.hasOwnProperty('tast_name')) {
        setting.tast_name.forEach((element, index) => {
          if (globalSettings.hasOwnProperty(element)) {
            if (setting.tast_umschalt[index] == 1) {
              globalSettings[element].letters.shift = setting.letters[index];
            } else if (setting.tast_umschalt[index] == 2) {
              globalSettings[element].letters.ctrl = setting.letters[index];
            } else if (setting.tast_umschalt[index] == 3) {
              globalSettings[element].letters.alt = setting.letters[index];
            }
          } else {
            globalSettings[element] = { tast_finger: setting.tast_finger[index], tast_bname: setting.tast_bname[index], tast_wort: setting.tast_wort[index], tast_lekt: setting.tast_lekt[index], t_reihe: setting.t_reihe[index], zeichen: setting.zeichen[index], tnr_asc: setting.tnr_asc[index], letters: { normal: setting.letters[index], shift: '', ctrl: '', alt: '' } };
          }
        });
      }
      globalSettings.row4 = [
        {asci_cod:"220",letters:{normal:"°",ctrl:"",shift:"",alt:""},cssClass:''},
        {asci_cod:"48",letters:{normal:"0",ctrl:"",shift:"=",alt:""},cssClass:''},
        {asci_cod:"49",letters:{normal:"1",ctrl:"",shift:"!",alt:""},cssClass:''},
        {asci_cod:"50",letters:{normal:"2",ctrl:"",shift:"\"",alt:""},cssClass:''},
        {asci_cod:"51",letters:{normal:"3",ctrl:"",shift:"§",alt:""},cssClass:''},
        {asci_cod:"52",letters:{normal:"4",ctrl:"",shift:"$",alt:""},cssClass:''},
        {asci_cod:"53",letters:{normal:"5",ctrl:"",shift:"%",alt:""},cssClass:''},
       {asci_cod:"54",letters:{normal:"6",ctrl:"",shift:"&",alt:""},cssClass:''},
        {asci_cod:"55",letters:{normal:"7",ctrl:"",shift:"/",alt:""},cssClass:''},
        {asci_cod:"56",letters:{normal:"8",ctrl:"",shift:"(",alt:""},cssClass:''},
        {asci_cod:"57",letters:{normal:"9",ctrl:"",shift:")",alt:""},cssClass:''},
        {asci_cod:"219",letters:{normal:"ß",ctrl:"",shift:"?",alt:""},cssClass:''},
        {asci_cod:"191",letters:{normal:"`",ctrl:"",shift:"",alt:""},cssClass:''}
      ];
      globalSettings.row3 = [
         {asci_cod:"81",letters:{normal:"q",ctrl:"",shift:"Q",alt:""},cssClass:''},
         {asci_cod:"87",letters:{normal:"w",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"69",letters:{normal:"e",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"82",letters:{normal:"r",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"84",letters:{normal:"t",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"90",letters:{normal:"z",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"85",letters:{normal:"u",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"73",letters:{normal:"i",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"79",letters:{normal:"o",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"80",letters:{normal:"p",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"186",letters:{normal:"ü",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"187",letters:{normal:"*",ctrl:"",shift:"",alt:""},cssClass:''}
      ];
      globalSettings.row2 = [
       {asci_cod:"65",letters:{normal:"a",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"83",letters:{normal:"s",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"68",letters:{normal:"d",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"70",letters:{normal:"f",ctrl:"",shift:"",alt:""},cssClass:''},
      {asci_cod: "71",letters:{normal:"g",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"72",letters:{normal:"h",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"74",letters:{normal:"j",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"75",letters:{normal:"k",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"76",letters:{normal:"l",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"192",letters:{normal:"ö",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"222",letters:{normal:"ä",ctrl:"",shift:"",alt:""},cssClass:''},
       {asci_cod:"191",letters:{normal:"'",ctrl:"",shift:"",alt:""},cssClass:''},
      ];
      
      globalSettings.row1 = [
         {asci_cod:"226",letters:{normal:">",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod: "89",letters:{normal:"y",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"88",letters:{normal:"x",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod: "67",letters:{normal:"c",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"86",letters:{normal:"v",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"66",letters:{normal:"b",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"78",letters:{normal:"n",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"77",letters:{normal:"m",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"188",letters:{normal:";",ctrl:"",shift:";",alt:""},cssClass:''},
         {asci_cod:"190",letters:{normal:":",ctrl:"",shift:"",alt:""},cssClass:''},
         {asci_cod:"189",letters:{normal:"_",ctrl:"",shift:"_",alt:""},cssClass:''},
      ];


      for (let i in globalSettings.row1) {
        globalSettings.row1[i].cssClass = this.findLetterCssClass(1, parseInt(i) + 2);
      }
      for (let i in globalSettings.row2) {
        globalSettings.row2[i].cssClass = this.findLetterCssClass(2, parseInt(i) + 2);
      }
      for (let i in globalSettings.row3) {
        globalSettings.row3[i].cssClass = this.findLetterCssClass(3, parseInt(i) + 2);
      }
      for (let i in globalSettings.row4) {
        globalSettings.row4[i].cssClass = this.findLetterCssClass(4, parseInt(i) + 2);
      }

      this.localStorage.insert('globalSettings', globalSettings);
    });


  }
  private findLetterCssClass(row, col: number) {
    if (row == 4) {
      if ([2, 3, 12, 13].indexOf(col) >= 0) {
        return 'primary';
      } else if ([4,11].indexOf(col) >= 0) {
        return 'warning';
      } else if ([5,10].indexOf(col) >= 0) {
        return 'success';
      } else if ([6,7,8,9].indexOf(col) >= 0) {
        return 'danger';
      }
      return 'default';

    } else if (row == 3 || row==2) {
     
      if ([1,10,11].indexOf(col) >= 0) {
        return 'primary';
      } else if ([2,9].indexOf(col) >= 0) {
        return 'warning';
      } else if ([3,8].indexOf(col) >= 0) {
        return 'success';
      } else if ([4,5,6,7,8].indexOf(col) >= 0) {
        return 'danger';
      }
      return 'default';
    } else if (row == 1) {
      if ([2, 11].indexOf(col) >= 0) {
        return 'primary';
      } else if ([3,10].indexOf(col) >= 0) {
        return 'warning';
      } else if ([4,9].indexOf(col) >= 0) {
        return 'success';
      } else if ([5,6,7,8].indexOf(col) >= 0) {
        return 'danger';
      }
      return 'default';
    }

  }
}


/*
keyboard JSON.
{"16":{"normal":"Shift","ctrl":"","shift":"","alt":""},"17":{"normal":"Control","ctrl":"","shift":"","alt":""},"18":{"normal":"AltGraph","ctrl":"","shift":"","alt":""},"48":{"normal":"0","ctrl":"","shift":"=","alt":""},"49":{"normal":"1","ctrl":"","shift":"!","alt":""},"50":{"normal":"2","ctrl":"","shift":"\"","alt":""},"51":{"normal":"3","ctrl":"","shift":"§","alt":""},"52":{"normal":"4","ctrl":"","shift":"$","alt":""},"53":{"normal":"5","ctrl":"","shift":"%","alt":""},"54":{"normal":"6","ctrl":"","shift":"&","alt":""},"55":{"normal":"7","ctrl":"","shift":"/","alt":""},"56":{"normal":"8","ctrl":"","shift":"(","alt":""},"57":{"normal":"9","ctrl":"","shift":")","alt":""},"65":{"normal":"a","ctrl":"","shift":"","alt":""},"66":{"normal":"b","ctrl":"","shift":"","alt":""},"67":{"normal":"c","ctrl":"","shift":"","alt":""},"68":{"normal":"d","ctrl":"","shift":"","alt":""},"69":{"normal":"e","ctrl":"","shift":"","alt":""},"70":{"normal":"f","ctrl":"","shift":"","alt":""},"71":{"normal":"g","ctrl":"","shift":"","alt":""},"72":{"normal":"h","ctrl":"","shift":"","alt":""},"73":{"normal":"i","ctrl":"","shift":"","alt":""},"74":{"normal":"j","ctrl":"","shift":"","alt":""},"75":{"normal":"k","ctrl":"","shift":"","alt":""},"76":{"normal":"l","ctrl":"","shift":"","alt":""},"77":{"normal":"m","ctrl":"","shift":"","alt":""},"78":{"normal":"n","ctrl":"","shift":"","alt":""},"79":{"normal":"o","ctrl":"","shift":"","alt":""},"80":{"normal":"p","ctrl":"","shift":"","alt":""},"81":{"normal":"q","ctrl":"","shift":"Q","alt":""},"82":{"normal":"r","ctrl":"","shift":"","alt":""},"83":{"normal":"s","ctrl":"","shift":"","alt":""},"84":{"normal":"t","ctrl":"","shift":"","alt":""},"85":{"normal":"u","ctrl":"","shift":"","alt":""},"86":{"normal":"v","ctrl":"","shift":"","alt":""},"87":{"normal":"w","ctrl":"","shift":"","alt":""},"88":{"normal":"x","ctrl":"","shift":"","alt":""},"89":{"normal":"y","ctrl":"","shift":"","alt":""},"90":{"normal":"z","ctrl":"","shift":"","alt":""},"186":{"normal":"ü","ctrl":"","shift":"","alt":""},"187":{"normal":"*","ctrl":"","shift":"","alt":""},"188":{"normal":";","ctrl":"","shift":";","alt":""},"189":{"normal":"_","ctrl":"","shift":"_","alt":""},"190":{"normal":":","ctrl":"","shift":"","alt":""},"191":{"normal":"'","ctrl":"","shift":"","alt":""},"192":{"normal":"ö","ctrl":"","shift":"","alt":""},"219":{"normal":"ß","ctrl":"","shift":"?","alt":""},"220":{"normal":"°","ctrl":"","shift":"","alt":""},"221":{"normal":"Dead","ctrl":"","shift":"Dead","alt":""},"222":{"normal":"ä","ctrl":"","shift":"","alt":""},"226":{"normal":">","ctrl":"","shift":"","alt":""}}
*/