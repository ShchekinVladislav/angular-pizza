import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ConfigService} from "../../service/config.service";
import {PizzaBasket} from "../../interface/pizzaBasket";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['../../app.component.less']
})
export class BasketComponent implements OnInit {
  constructor(  private config: ConfigService) { }
  basketPizza: PizzaBasket[] = [];
  ngOnInit(): void {
    this.basketPizza = this.config.getBasket();
  }
  resetBasket(){
    this.config.resetBasket();
    this.basketPizza = [];
  }

}
