import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: 'Window', useValue: window }]
})
export class AppComponent {
	public innerHeight : any;
  	title = 'app';
  	ngOnInit() {
  		this.innerHeight = window.innerHeight;
  	}
	
}
