import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['../../app.component.less']
})
export class FiltersComponent implements OnInit {

  typeAll = [
    {name: 'Все', value: 'all', active: true},
    {name: 'Мясные', value: 'meat', active: false},
    {name: 'Вегетарианская', value: 'vegan', active: false},
    {name: 'Гриль', value: 'grill', active: false},
    {name: 'Острые', value: 'sharpness', active: false},
  ];
  constructor() { }

  ngOnInit(): void {
  }

  chooseActive(value: string){
    if(value != 'all'){
      let itemMain = this.typeAll.find(item => item.value == 'all');
      if(itemMain) {
        itemMain.active = false;
      }
      let item = this.typeAll.find(item => item.value == value);
      if(item){
        item.active = item.active ? false : true;
      }
    } else {
      for (let i = 0; i < this.typeAll.length; i++){
        if(this.typeAll[i].value != 'all'){
          this.typeAll[i].active = false;
        } else {
          this.typeAll[i].active = true;
        }
      }
    }
  }

}
