import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {
    '(document:keypress)': 'handleKeyPressEvent($event)',
 	'(document:keyup)': 'handleKeyUpEvent($event)',
 	'(document:mouseup)': 'handleMouseUpEvent($event)',
  }

})
export class DashboardComponent implements OnInit {
	public words : string[];
	public wordIndex : any;
	public totalWords : any;
	public wordIndexInterval : any;
	public animationInterval : any;
	public bottomPosition : any;
	public wordMatch : boolean;
	public totalAttempt : any;
	public totalHit : any;
	public hitPercent : any;
	public keyValue : any;
	constructor() {
		this.words = [
					"a","b","c","d","e","f","g","h","i","j","k","l","m","n",
					"o","p","q","r","s","t","u","v","w","y","z"
				];
		this.totalWords = this.words.length;
		this.bottomPosition = -100;
		this.wordMatch = false;
		this.totalAttempt = 0;
		this.totalHit = 0;
		this.hitPercent = 0;
		this.keyValue ='';
	}

	writeText (key){
		this.keyValue = key;
		 if(key==this.words[this.wordIndex]){
    		this.totalHit += 1;
    		this.hitPercent = ((this.totalHit/this.totalAttempt)*100).toFixed(2);
    		 clearInterval(this.animationInterval);
    		this.wordMatch = true;
    	}
	}

	handleKeyPressEvent(event: KeyboardEvent) {
    	let key = event.key;
    	this.keyValue = key;
    	if(key==this.words[this.wordIndex]){
    		this.totalHit += 1;
    		this.hitPercent = ((this.totalHit/this.totalAttempt)*100).toFixed(2);
    		 clearInterval(this.animationInterval);
    		this.wordMatch = true;
    	}
  	}

  	handleKeyUpEvent (event : KeyboardEvent){
  		this.keyValue = '';
  	}
  	handleMouseUpEvent (event : MouseEvent){
  		setInterval ( () => {
			this.keyValue = '';
  		},200);
  		
  	}
	ngOnInit() {

		this.wordIndexInterval = setInterval(() => {
			this.totalAttempt +=1;
			this.wordMatch = false;;
			clearInterval(this.animationInterval);
			if(this.totalAttempt>1){
				this.hitPercent = ((this.totalHit/(this.totalAttempt-1))*100).toFixed(2);
			}
			this.bottomPosition = -100;
		  	this.wordIndex = Math.ceil(Math.random() * (this.totalWords - 0) + 0);

		  	this.animationInterval = setInterval ( () => {
				this.bottomPosition += 10; 
			},60);
		  
	 	}, 5000);
	}

	ngOnDestroy() {
	  if (this.wordIndexInterval) {
	    clearInterval(this.wordIndexInterval);
	    clearInterval(this.animationInterval);
	  }
	}
}
