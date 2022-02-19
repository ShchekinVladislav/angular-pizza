import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-filter-select',
  templateUrl: './custom-filter-select.component.html',
  styleUrls: ['../../app.component.less']
})
export class CustomFilterSelectComponent implements OnInit {

  list: boolean = false;
  activeType: string = 'популярности';
  rotate: number = 0;


  constructor() { }

  ngOnInit(): void {
  }

  openList(){
    if (this.list) {
      this.list = false;
      this.rotate = 0;
    } else {
      this.list = true;
      this.rotate = 180;
    }
  }
  activeSort(value: string) {
    switch (value){
      case 'popular':
        this.activeType = 'популярности';
        break;
      case 'prise':
        this.activeType = 'цене';
        break;
      case 'alphabet':
        this.activeType = 'алфавиту';
        break;
    }
  }

}
