import { Component, EventEmitter, Output } from "@angular/core";
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
    @Output() pizzaSelected = new EventEmitter<string>();

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

  selectPizza(pizzaId: string) {
    this.pizzaService.getPizzaById(pizzaId).subscribe(
      pizza => {
        this.pizza = pizza;
        this.pizzaSelected.emit(pizza.id);
      },
      error => {
        console.log(error);
      }
    );
  }

}