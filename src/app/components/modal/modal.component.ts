import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {Subscription} from "rxjs";
import {Pizza} from "../../interface/pizza";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['../../app.component.less']
})
export class ModalComponent implements OnInit {

  subscriptions: Subscription[] = [];
  pizza: Pizza | undefined = undefined;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.config.modalValue$.subscribe((res) => {
      if(res){
        this.pizza = res;
      } else {
        this.pizza = undefined;
      }
    }));
  }

  closeModal(){
    this.config.modalValue$.next(null);
  }

}
