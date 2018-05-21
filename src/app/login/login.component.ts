import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [ApiService]
})
export class LoginComponent implements OnInit {
	model : any = {};
	returnUrl : string;
	

 constructor(private route: ActivatedRoute,	private router: Router, private _apiService:ApiService ) { 
 	this.model.password = '123';

 }

 login(){
   
   this._apiService.login(this.model).then((data)=>{
    this.router.navigate([this.returnUrl]);
   });
  
 }

  ngOnInit() {
  	this.returnUrl = 'home';
  }

}
