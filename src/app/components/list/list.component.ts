import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {Pizza} from "../../interface/pizza";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../app.component.less']
})
export class ListComponent implements OnInit, OnDestroy {

  pizzaArray: Pizza[] = [];
  basket: [] = [];
  subscriptions: Subscription[] = [];
  filter: any[] = [];
  loader: boolean = false;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.config.getPizza().subscribe(result => {
      for(let i = 0; i < result.length; i++) {
        result[i].display = true;
      }
      this.pizzaArray = result;
      this.filteredPizza();
      setTimeout(() => {
        this.loader = true;
      }, 1000);
    }));
    this.subscriptions.push(this.config.sortValue$.subscribe((res) => {
      switch (res) {
        case 'popular':
          this.pizzaArray.sort((a, b) => a.id - b.id);
          break;
        case 'price':
          this.pizzaArray.sort((a, b) => a.priceActive - b.priceActive);
          break;
        case 'alphabet':
          this.pizzaArray.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
          })
          break;
      }
    }));
    this.subscriptions.push(this.config.filterValue$.subscribe((res) => {
      this.filter = res;
      if(!this.filter || this.filter.length === 0){
        this.filter = ['all'];
      }
      this.filteredPizza();
    }));
    this.basket = this.config.getBasket();
  }
  changeBough(id: number, bough: string){
    let itemPizza = this.pizzaArray.find(item => item.id == id);
    if(itemPizza){
      for(let i = 0; i < itemPizza.bough.length; i++){
        if(itemPizza.bough[i].value === bough) {
          itemPizza.bough[i].active = true;
          let sizeItem = itemPizza.size.find(size => size.active == true);
          if(sizeItem) {
           this.changePrice(itemPizza, sizeItem.value, bough);
          }
        } else {
          itemPizza.bough[i].active = false;
        }
      }
    }
  }
  changeSize(id: number, size: number){
    let itemPizza = this.pizzaArray.find(item => item.id == id);
    if(itemPizza){
      for(let i = 0; i < itemPizza.size.length; i++){
        if(itemPizza.size[i].value === size) {
          itemPizza.size[i].active = true;
          let boughItem = itemPizza.bough.find(bough => bough.active == true);
          if(boughItem) {
            this.changePrice(itemPizza, size, boughItem.value);
          }
        } else {
          itemPizza.size[i].active = false;
        }
      }
    }
  }
  changePrice(item: Pizza, size: number, bough: string){
    let activePrice;
    switch (bough) {
      case 'small':
        activePrice = item.priceAll.small.find(item => item.value === size);
        break;
      case 'big':
        activePrice = item.priceAll.big.find(item => item.value === size);
        break;
    }
    if(activePrice){
      item.priceActive = activePrice.price;
    } else {
      item.priceActive = 0;
    }
  }
  filteredPizza() {
    if(this.filter && this.filter.length == 1 && this.filter[0] === 'all'){
      for(let z = 0; z < this.pizzaArray.length; z++){
        this.pizzaArray[z].display = true;
      }
      return;
    }
    let search = false;
    if(this.filter){
      for(let q = 0; q < this.pizzaArray.length; q++){
        search = false;
        for(let i = 0; i < this.pizzaArray[q].filter.length; i++) {
          for(let j = 0; j < this.filter.length; j++) {
            if(this.pizzaArray[q].filter[i] === this.filter[j]) {
              search = true;
            }
          }
        }
        if(search){
          this.pizzaArray[q].display = true;
        } else {
         this.pizzaArray[q].display = false;
        }
      }
    }
  }
  addPizza(pizza: Pizza){
    this.config.parsePizza(pizza);
  }
  openModal(pizza: Pizza){
    this.config.modalValue$.next(pizza);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
