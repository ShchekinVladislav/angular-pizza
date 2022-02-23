import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './page/home/home.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { BasketComponent } from './page/basket/basket.component';
import { ListBasketComponent } from './components/list-basket/list-basket.component';
import { CustomFilterSelectComponent } from './components/custom-filter-select/custom-filter-select.component';
import { ModalFilterSelectComponent } from './components/custom-filter-select/modal-filter-select/modal-filter-select.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FiltersComponent,
    ListComponent,
    BasketComponent,
    ListBasketComponent,
    CustomFilterSelectComponent,
    ModalFilterSelectComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
