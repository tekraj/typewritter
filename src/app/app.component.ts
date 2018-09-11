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
	title = 'app';
	constructor(){
	}
  	ngOnInit() {
  	}
	
}
