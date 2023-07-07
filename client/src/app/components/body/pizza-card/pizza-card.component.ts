import { Component, Input, OnInit } from "@angular/core";
import { IPizza } from "src/app/models/pizza.model";
import { ITopping } from "src/app/models/topping.model";
import { PizzaService } from "src/app/services/pizza.services";

@Component({
    selector: 'app-pizza-card',
    templateUrl: './pizza-card.component.html',
    styleUrls: ['./pizza-card.component.scss']
})

export class PizzaCardComponent implements OnInit {
    @Input() pizza!: IPizza;
    @Input() allToppings!: ITopping[];
  
    addToppings = false;
  
    constructor() {}
  
    ngOnInit() {}
  
    onToppingChange(event) {
      if (event.target.checked) {
        this.pizza.toppings.push(this.allToppings.find(topping => topping.id == event.target.value));
      } else {
        this.pizza.toppings = this.pizza.toppings.filter(topping => topping.id != event.target.value);
      }
    }
  
    toggleAddToppings() {
      this.addToppings = !this.addToppings;
    }
  
    confirmPizza() {
      // logic to confirm the pizza
    }
  }