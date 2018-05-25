import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  public typeSettins: any = {};
  public currentType: number = 1;
  public typeButtonNo: number = 1;
  public typeClicked: number = 1;
  constructor(private _elRef: ElementRef) {
    this.typeSettins.value = "asdfghjklö";
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('.first-tast-btn').click(function () {
        $('.first-tast-btn').removeClass('active');
        $(this).addClass('active');
      });
      $('.arbeit-btn').click(function () {
        $('.arbeit-btn').removeClass('active');
        $(this).addClass('active');
      });
      $('.darst-btn').click(function () {
        $('.darst-btn').removeClass('active');
        $(this).addClass('active');
      });
      $('.sound-btn').click(function () {
        $('.sound-btn').removeClass('active');
        $(this).addClass('active');
      });
      $('.size-btn').click(function () {
        $('.size-btn').removeClass('active');
        $(this).addClass('active');
      });
    });
  }

  setTypeValue = (value: string, type: number, tBNo: number) => {
    if (this.typeButtonNo === tBNo)
      return false;
    this.typeButtonNo = tBNo;
    if (this.currentType == type) {
      if (this.typeClicked < 2) {
        this.typeClicked++;
        this.typeSettins.value += value;
      }

    } else {
      this.typeClicked = 1;
      this.currentType = type;
      this.typeSettins.value = value;
    }
  }
}
