import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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

	constructor(){
			this.backgroundNo = 0;
			this.background = '../assets/images/typewriter'+this.backgroundNo+'.png';
			
	}
	changeBackground() {
		
		this.backgroundNo+=1;
		if(this.backgroundNo>26){
			this.backgroundNo =0;
		}
		this.background = '../assets/images/typewriter'+this.backgroundNo+'.png';
		
	} 

  	ngOnInit() {
  		this.innerHeight = window.innerHeight;
  	}
	
}
