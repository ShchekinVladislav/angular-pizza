import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {PizzaBasket} from "../../interface/pizzaBasket";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-basket',
  templateUrl: './list-basket.component.html',
  styleUrls: ['../../app.component.less']
})
export class ListBasketComponent implements OnInit {
  @Input()basketPizza: PizzaBasket[] = [];
  subscriptions: Subscription[] = [];
  basket = {cost: 0, quantity: 0};
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.config.basketValue$.subscribe((res) => {
      this.basket = res;
    }));
  }

  setQuantity(operation: string, index: number){
    if(operation === 'del' && this.basketPizza[index].quantity === 1){
      return;
    } else {
      this.basketPizza[index].quantity = this.basketPizza[index].quantity - 1;
    }
    if(operation === 'add'){
      this.basketPizza[index].quantity = this.basketPizza[index].quantity + 2;
    }
    this.config.setBasket(this.basketPizza);
  }
  deletePizza(index: number){
    this.basketPizza.splice(index, 1);
    this.config.setBasket(this.basketPizza);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
