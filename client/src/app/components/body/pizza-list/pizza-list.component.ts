import { Component } from "@angular/core";
import { PizzaService } from "src/app/services/pizza.services";
import { Router } from '@angular/router';
import { IPizza } from "src/app/models/pizza.model";

@Component({
    selector: 'app-pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.scss']
})

export class PizzaListComponent {
    pizzas: any[] = []; 
    pizza! : IPizza;

    constructor(private pizzaService: PizzaService, private router: Router) { }

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

  selectPizza(pizza: IPizza): void {
    this.router.navigate(['/pizza', pizza.id]);
  }

}