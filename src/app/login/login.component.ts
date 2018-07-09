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
      for (let i in globalSettings) {
        let set = globalSettings[i];

        if (set && typeof set == 'object' && set.hasOwnProperty('letters') && set.letters.normal && set.letters.normal.trim().length > 0) {
          if (set.t_reihe == 1) {
            let cssClass = this.findLetterCssClass(1, globalSettings.row1.length + 1);
            globalSettings.row1.push({ letters: set.letters, asci_cod: i, cssClass: cssClass });
            globalSettings[i].cssClass = cssClass;
          } else if (set.t_reihe == 2) {
            let cssClass = this.findLetterCssClass(2, globalSettings.row2.length + 1);
            globalSettings.row2.push({ letters: set.letters, asci_cod: i, cssClass: cssClass });
            globalSettings[i].cssClass = cssClass;
          } else if (set.t_reihe == 3) {
            let cssClass = this.findLetterCssClass(3, globalSettings.row3.length + 1);
            globalSettings.row3.push({ letters: set.letters, asci_cod: i, cssClass: cssClass });
            globalSettings[i].cssClass = cssClass;
          } else if (set.t_reihe == 4) {
            let cssClass = this.findLetterCssClass(4, globalSettings.row4.length + 1);
            globalSettings.row4.push({ letters: set.letters, asci_cod: i, cssClass: cssClass });
            globalSettings[i].cssClass = cssClass;
          }
        }
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
