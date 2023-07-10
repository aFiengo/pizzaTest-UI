import { Component, OnInit } from '@angular/core';
import { ITopping } from '../../../models/topping.model';
import { ToppingService } from '../../../services/topping.services';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-topping-list',
  templateUrl: './topping-list.component.html',
  styleUrls: ['./topping-list.component.scss']
})
export class ToppingListComponent implements OnInit {
  toppings: ITopping[] = [];
  newTopping: ITopping = {id: '', name: ''};

  constructor(private toppingService: ToppingService) { }

  ngOnInit(): void {
    this.toppingService.getAllToppings().subscribe(data => this.toppings = data);
  }

  getToppings(): void {
    console.log('Getting toppings...');
    this.toppingService.getAllToppings()
      .subscribe(toppings => this.toppings = toppings);
  }

  addTopping(topping: ITopping): void {
    this.toppingService.addTopping(topping)
    .pipe(
      tap(data => console.log('Added Topping: ', JSON.stringify(data))),
      switchMap(() => this.toppingService.getAllToppings())
    )
    .subscribe(toppings => this.toppings = toppings);
  }

  removeTopping(topping: ITopping): void {
    this.toppingService.deleteTopping(topping.id)
    .pipe(
      tap(() => console.log('Deleted Topping')),
      switchMap(() => this.toppingService.getAllToppings())
    )
    .subscribe(toppings => this.toppings = toppings);
  }

  onToppingInputChange(event: any): void {
  }

}