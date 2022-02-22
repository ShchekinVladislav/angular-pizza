import { Component, OnInit } from '@angular/core';
import {filterAll} from "./filter.config";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['../../app.component.less']
})
export class FiltersComponent implements OnInit {

  typeAll = filterAll;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
  }

  chooseActive(value: string){
    let quantity = 0;
    let array = [];
      for (let i = 0; i < this.typeAll.length; i++){
        if(this.typeAll[i].value === value && value != 'all'){
          this.typeAll[i].active = this.typeAll[i].active ? false : true;
        }
        if(this.typeAll[i].active && this.typeAll[i].value != 'all'){
          array.push(this.typeAll[i]['value']);
          quantity = quantity + 1;
        }
        if(value === 'all'){
          this.refreshFilter();
          this.typeAll[i].active = true;
          return;
        }
      }
      this.config.filterValue$.next(array);
    let itemMain = this.typeAll.find(item => item.value == 'all');
      if(itemMain){
        if(quantity == 0) {
          itemMain.active = true;
        } else {
          itemMain.active = false;
        }
      }
  }

  refreshFilter(){
    for (let i = 0; i < this.typeAll.length; i++){
      if(this.typeAll[i].active && this.typeAll[i].value != 'all'){
        this.typeAll[i].active = false;
      }
    }
    this.config.filterValue$.next(['all']);
  }

}
