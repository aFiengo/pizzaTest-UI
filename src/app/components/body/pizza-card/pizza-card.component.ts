import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { IPizza } from "src/app/models/pizza.model";
import { ITopping } from "src/app/models/topping.model";
import { PizzaService } from "src/app/services/pizza.services";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pizza-card',
    templateUrl: './pizza-card.component.html',
    styleUrls: ['./pizza-card.component.scss']
})

export class PizzaCardComponent implements OnInit {
    pizza: IPizza | null = null;
  @Input() topping!: ITopping;
  @Input() pizzaId!: string | null;
  allToppings: ITopping[] = [];
  toppings: ITopping[] = [];
  selectedToppings: ITopping[] = [];
  selectedToppingId!: string;
  addToppings = false;
  newTopping: ITopping = {id: '', name: ''};

  
  constructor(private route: ActivatedRoute, private pizzaService: PizzaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('Pizza ID:', id);
    this.getPizza(id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["pizzaId"] && changes["pizzaId"].currentValue) {
      this.getPizza(changes["pizzaId"].currentValue);
    }
  }

  onToppingChange(event: Event, topping : ITopping): void {
    let target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedToppings.push(topping);
    } else {
      this.selectedToppings = this.selectedToppings.filter(t => t.id != topping.id);
    }
  }

  removeTopping(toppingId: string): void {
    if(this.pizza) {
      this.pizzaService.deleteToppingFromPizza(this.pizza.id, toppingId).subscribe(
        () => this.pizza!.toppings = this.pizza?.toppings?.filter(topping => topping.id != toppingId),
        error => console.error('Error removing topping: ', error)
      );
    }
  }

  toggleAddToppings() {
    this.addToppings = !this.addToppings;
  }

  confirmToppings(): void {
    if(this.selectedToppings && this.pizza) {
      this.selectedToppings.forEach(topping => {
        this.pizzaService.addToppingToPizza(this.pizza!.id, topping.id).subscribe(
          () => {
            if(this.pizza!.toppings) {
              this.pizza!.toppings = [...this.pizza!.toppings, topping];
            } else {
              this.pizza!.toppings = [topping];
            }
          },
          error => console.error('Error adding topping: ', error)
        );
      });
    }
  }
  addTopping(pizzaId: string): void {
    if (this.newTopping.id) {
      this.pizzaService.addToppingToPizza(pizzaId, this.newTopping.id)
        .subscribe(() => this.getPizza(pizzaId));
    }
  }
  onToppingSelect(toppingId: string): void {
    this.selectedToppingId = toppingId;
  }

  getPizza(id: string): void {
    console.log("Getting pizza with ID: ", this.pizza?.id);
    if(id) {
        this.pizzaService.getPizzaById(id).subscribe(
            pizza => this.pizza = pizza,
            error => console.error('Error getting pizza: ', error)
        );
    }
  }

  finishPizza(): void {
    console.log(this.pizza);
  }
}