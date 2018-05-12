import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	model : any = {};
	returnUrl : string;
	

 constructor(private route: ActivatedRoute,	private router: Router ) { 
 	

 }

 login(){
 	this.router.navigate([this.returnUrl]);
 }

  ngOnInit() {
  	this.returnUrl = 'dashboard';
  }

}
