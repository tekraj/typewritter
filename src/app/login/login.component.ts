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
      this.localStorage.insert('settingMode',this.settingMode);
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

  private importSettings(){
    this._apiService.getSetting(this.settingMode, (data)=>{
     let  setting: {[k: string]: any} = {};
     let textSetting = data.split('&');
      textSetting.forEach(element => {
        if(element && element.trim().length>2){
          let singleSetting = element.split('=');
          setting[singleSetting[0]]= singleSetting[1];
        }
      });
      let iconSound = {};
      let iSound = setting.tast_wort.split(',');
      iSound.forEach(element => {
        if(element && element.trim().length>2){
          iconSound[element[0].toLowerCase()] = 'w_'+element;
        }
      });
      setting.iconSound = iconSound;
      this.localStorage.insert('setting',setting);
    });
  } 
}
