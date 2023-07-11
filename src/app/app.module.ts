import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { PizzaListComponent } from './components/body/pizza-list/pizza-list.component';
import { ToppingListComponent } from './components/body/topping-list/topping-list.component';
import { PizzaCardComponent } from './components/body/pizza-card/pizza-card.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PizzaListComponent,
    PizzaCardComponent,
    ToppingListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
    
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
