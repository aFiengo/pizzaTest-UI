import { Component } from "@angular/core";

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
    this.pizzaService.getAllPizzas()
      .subscribe(
        data => this.pizzas = data,
        error => console.error(error)
      );
  }

  selectPizza(pizza): void {
    // Aquí puedes implementar la lógica para abrir el componente 'pizza-card'
    // Esto dependerá de cómo hayas diseñado tu aplicación.
  }
}