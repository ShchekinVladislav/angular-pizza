import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Pizza} from "../interface/pizza";
import {PizzaBasket} from "../interface/pizzaBasket";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiHost: string = './assets/data/mockPizza.json';

  basketPizza: PizzaBasket[] = [];
  sortValue$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  basketValue$: BehaviorSubject<any> = new BehaviorSubject({cost: 0, quantity: 0});
  filterValue$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {
  }

  getPizza(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiHost);
  }

  getBasket() {
    let basket: any;
    basket = localStorage.getItem('basket');
    if (basket) {
      this.basketPizza = JSON.parse(basket);
      this.getBasketCost();
      return JSON.parse(basket);
    } else {
      return [];
    }
  }
  setBasket(value: PizzaBasket[]) {
    this.basketPizza = value;
    localStorage.setItem('basket', JSON.stringify(this.basketPizza));
    this.getBasketCost();
  }
  resetBasket(){
    this.basketPizza = [];
    this.getBasketCost();
    localStorage.setItem('basket', JSON.stringify(this.basketPizza));
  }

  getBasketCost() {
    if (this.basketPizza.length > 0) {
      this.calculateBasket();
    } else {
      this.basketValue$.next({cost: 0, quantity: 0});
    }
  }

  parsePizza(pizza: Pizza) {
    let bough = pizza.bough.find(bough => bough.active == true);
    let boughBasket: string;
    let string: string;
    if (bough) {
      string = 'Тесто ' + bough.name + ', ';
      boughBasket = bough.value;
    } else {
      boughBasket = 'small';
      string = 'Тесто традиционное, ';
    }
    let size = pizza.size.find(size => size.active == true);
    let sizeBasket: number;
    if (size) {
      string = string + size.name;
      sizeBasket = size.value;
    } else {
      sizeBasket = 26;
      string = string + '26 см.';
    }
    let pizzaBasket: PizzaBasket = {
      name: pizza.name,
      price: pizza.priceActive,
      avatar: pizza.avatar,
      id: pizza.id,
      bough: boughBasket,
      size: sizeBasket,
      option: string,
      quantity: 1,
    };
    this.addPizza(pizzaBasket);
  }

  addPizza(pizza: PizzaBasket) {
    if (this.basketPizza.length === 0) {
      this.basketPizza.push(pizza);
    } else {
      let uniq = 0;
      for (let i = 0; i < this.basketPizza.length; i++) {
        if (this.basketPizza[i].id === pizza.id && this.basketPizza[i].bough === pizza.bough && this.basketPizza[i].size === pizza.size) {
          this.basketPizza[i].quantity = this.basketPizza[i].quantity + 1;
        } else {
          uniq = uniq + 1;
        }
      }
      if (uniq === this.basketPizza.length) {
        this.basketPizza.push(pizza);
      }
    }
    localStorage.setItem('basket', JSON.stringify(this.basketPizza));
    this.getBasketCost();
  }
  calculateBasket(){
    let costBasket: number = 0;
    let quantityBasket: number = 0;
    for(let i = 0; i < this.basketPizza.length; i++){
      costBasket = costBasket + (this.basketPizza[i].quantity * this.basketPizza[i].price);
      quantityBasket = quantityBasket + this.basketPizza[i].quantity;
    }
    this.basketValue$.next({cost: costBasket, quantity: quantityBasket});
  }
}

