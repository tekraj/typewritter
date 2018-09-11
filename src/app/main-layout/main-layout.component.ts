import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  title = 'app';
  public innerHeight : number;
	public backgroundNo :number;
	public background :string;
	constructor(private localStorageService:LocalStorageService){
			this.backgroundNo = this.localStorageService.select('backgroundNo');
			this.backgroundNo = this.backgroundNo ? this.backgroundNo : 0;
			this.background = '../assets/images/background/Symbol'+this.backgroundNo+'.png';
			
	}
	changeBackground() {
		
		this.backgroundNo+=1;
		if(this.backgroundNo>26){
			this.backgroundNo =0;
		}
		this.background = '../assets/images/background/Symbol'+this.backgroundNo+'.png';
		this.localStorageService.insert('backgroundNo',this.backgroundNo);
	} 

  	ngOnInit() {
  		this.innerHeight = window.innerHeight;
  	}

}
