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
    @Input() topping!: ITopping;
    toppings: any[] = []; 
    selectedToppings: ITopping[] = [];
    addToppings = false;
  
    constructor(
        private pizzaService: PizzaService
        ) {}
  
    ngOnInit() {}
  
    onToppingChange(event: Event, topping : ITopping): void {
        let target = event.target as HTMLInputElement;
    if (target.checked) {
        this.selectedToppings.push(this.topping);
    } else {
        this.selectedToppings = this.selectedToppings.filter(t => t.id != this.topping.id);
    }
      }

    removeTopping(toppingId: string): void {
        this.pizzaService.deleteToppingFromPizza(this.pizza.id, toppingId).subscribe(
          () => this.pizza.toppings = this.pizza?.toppings?.filter(topping => topping.id != toppingId),
          error => console.error('Error removing topping: ', error)
        );
    }
  
    toggleAddToppings() {
      this.addToppings = !this.addToppings;
    }

    confirmToppings(): void {
        if(this.selectedToppings && this.pizza) {
            this.selectedToppings.forEach(topping => {
              this.pizzaService.addToppingToPizza(this.pizza.id, topping.id).subscribe(
                () => {
                  if(this.pizza.toppings) {
                    this.pizza.toppings = [...this.pizza.toppings, topping];
                  } else {
                    this.pizza.toppings = [topping];
                  }
                },
                error => console.error('Error adding topping: ', error)
              );
            });
          }
      }
  
      finishPizza(): void {
        console.log(this.pizza);
        // Here you can also navigate to another component or do anything else you need.
      }


  }