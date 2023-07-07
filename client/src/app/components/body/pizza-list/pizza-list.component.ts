import { Component } from "@angular/core";
import { PizzaService } from "src/app/services/pizza.services";

@Component({
    selector: 'app-pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.scss']
})

export class PizzaListComponent {
    pizzas: any[] = []; 

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.pizzaService.getAllPizzasAsync().subscribe(data => this.pizzas = data);
  }

  getPizzas(): void {
    this.pizzaService.getAllPizzasAsync()
      .subscribe(
        data => this.pizzas = data,
        error => console.error(error)
      );
  }

}