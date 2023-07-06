import { Component } from "@angular/core";

@Component({
    selector: 'app-pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.scss']
})

export class PizzaListComponent {
    pizzas = [
        // Aquí vendría tu array de pizzas, cada una con su nombre e imagen.
    ];

    selectPizza(pizza) {
        // Aquí puedes implementar la lógica que se ejecuta cuando un usuario selecciona una pizza.
        console.log(pizza);
    }
}