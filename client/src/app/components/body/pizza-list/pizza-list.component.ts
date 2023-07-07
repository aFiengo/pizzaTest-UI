import { Component } from "@angular/core";
import { PizzaService } from "src/app/services/pizza.services";

@Component({
    selector: 'app-pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.scss']
})

export class PizzaListComponent {
    pizzas: any[] = []; // Aquí almacenaremos las pizzas que obtendremos del back-end

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.getPizzas();
  }

  getPizzas(): void {
    this.pizzaService.getAllPizzasAsync()
      .subscribe(
        data => this.pizzas = data,
        error => console.error(error)
      );
  }

}