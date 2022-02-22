import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../app.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  basket = {cost: 0, quantity: 0};
  subscriptions: Subscription[] = [];
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.config.basketValue$.subscribe((res) => {
     this.basket = res;
    }));
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
