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

  constructor(private route: ActivatedRoute, private router: Router, private _apiService: ApiService, private localStoreageService: LocalStorageService) {
    this.model.password = 'ms';
  }

  login() {
    this.message = 'Herstellung der internetverbindung bitte warten';
    this.loginProgress = true;
    this._apiService.login(this.model).then((data: any) => {
      let gegenstand = data[5].replace('gegenstand=', '');
      let st_lfdnr = data[1].replace('st_lfdnr=', '');
      let studentName = data[3].replace('stname=', '');
      this.localStoreageService.insert('gegenstand', gegenstand)
      this.localStoreageService.insert('st_lfdnr', st_lfdnr)
      this.localStoreageService.insert('std_name', studentName);
      if (studentName) {
        let stdNameArray = studentName.split(' ');
        if (stdNameArray.length > 1) {
          this.localStoreageService.insert('std_first_name', stdNameArray[0]);
          this.localStoreageService.insert('std_last_name', stdNameArray[1]);
        } else {
          this.localStoreageService.insert('std_first_name', stdNameArray[0]);
          this.localStoreageService.insert('std_last_name', stdNameArray[0]);
        }
      }
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

}
