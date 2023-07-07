import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { IPizza } from "src/app/models/pizza.model";
import { ITopping } from "src/app/models/topping.model";
import { PizzaService } from "src/app/services/pizza.services";
import { ToppingService } from "src/app/services/topping.services";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pizza-card',
    templateUrl: './pizza-card.component.html',
    styleUrls: ['./pizza-card.component.scss']
})

export class PizzaCardComponent implements OnInit {
    selectedPizza: IPizza | undefined;
    allToppings: ITopping[] = [];
    toppingToAdd: ITopping = { id: '', name: '' };
    toppings!: ITopping[];
  
    constructor(
      private pizzaService: PizzaService,
      private toppingService: ToppingService,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        this.getPizza(id);
        this.pizzaService.getToppingsForPizza(id);
  
      this.toppingService.getAllToppings().subscribe(
        toppings => this.allToppings = toppings,
        error => console.error('Error obteniendo los toppings:', error)
      );
    }

  removeTopping(toppingId: string): void {
    if(this.selectedPizza) {
      this.pizzaService.deleteToppingFromPizza(this.selectedPizza.id, toppingId).subscribe(
        () => this.selectedPizza!.toppings = this.selectedPizza?.toppings?.filter(topping => topping.id != toppingId),
        error => console.error('Error removing topping: ', error)
      );
    }
  }

  addToppingToPizza(pizzaId: string, toppingId: string): void {
    this.pizzaService.addToppingToPizza(pizzaId, toppingId)
      .subscribe(() => this.getPizza(pizzaId))
  }
  
  getPizza(id: string): void {
    console.log("Getting pizza with ID: ", id);
    if(id) {
        this.pizzaService.getPizzaById(id).subscribe(
            pizza => this.selectedPizza = pizza,
            error => console.error('Error getting pizza: ', error)
        );
    }
  }

  getAllToppings(): void {
    this.toppingService.getAllToppings().subscribe(
      toppings => {
        this.toppings = toppings;
      },
      error => {
        console.error('Error getting toppings: ', error);
      }
    );
  }

  finishPizza(): void {
    console.log(this.selectedPizza);
  }
}