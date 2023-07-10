import { Component, EventEmitter, Output } from "@angular/core";
import { PizzaService } from "src/app/services/pizza.services";
import { Router } from '@angular/router';
import { IPizza } from "src/app/models/pizza.model";
import { Observable } from "rxjs";

@Component({
    selector: 'app-pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.scss']
})

export class PizzaListComponent {
    pizzas: IPizza[] = []; 
    pizza! : IPizza;
    @Output() pizzaSelected = new EventEmitter<string>();

    constructor(private pizzaService: PizzaService, private router: Router) { }

    ngOnInit(): void {
      this.pizzaService.getAllPizzas().subscribe(
        (result: any) => {
          console.log(result);  // imprime el resultado completo
          this.pizzas = result.data;  // suponiendo que los datos vienen en la propiedad 'data'
          console.log(Array.isArray(this.pizzas));  // ahora debería imprimir 'true'
        },
        (error: any) => {
          console.error(error);
        }
      );
    }

  getPizzas(): void {
    this.pizzaService.getAllPizzas()
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