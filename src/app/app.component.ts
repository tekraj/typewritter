import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: 'Window', useValue: window }]
})
export class AppComponent {
	public innerHeight : number;
	public backgroundNo :number;
	public background :string;

	title = 'app';

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
