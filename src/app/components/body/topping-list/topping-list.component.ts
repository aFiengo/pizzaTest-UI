import { Component, OnInit } from '@angular/core';
import { ITopping } from '../../../models/topping.model';
import { ToppingService } from '../../../services/topping.services';

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
    this.toppingService.getAllToppings()
      .subscribe(toppings => this.toppings = toppings);
  }

  addTopping(topping: ITopping): void {
    this.toppingService.addTopping(topping)
      .subscribe(() => this.getToppings());
  }

  removeTopping(topping: ITopping): void {
    this.toppingService.deleteTopping(topping.id)
      .subscribe(() => this.getToppings());
  }

}