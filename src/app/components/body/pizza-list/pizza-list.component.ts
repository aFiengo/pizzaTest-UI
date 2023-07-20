import { Component, EventEmitter, Output } from "@angular/core";
import { PizzaService } from "../../../services/pizza.service";
import { IPizza } from "src/app/models/pizza.model";
import { MatDialog } from '@angular/material/dialog';
import { PizzaCardModalComponent } from "../pizza-card-modal/pizza-card-modal.component";

@Component({
    selector: 'app-pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.scss']
})

export class PizzaListComponent {
    pizzas: IPizza[] = []; 
    pizza! : IPizza;

    constructor(private pizzaService: PizzaService, private dialog: MatDialog) { }

    ngOnInit(): void {
      this.pizzaService.getAllPizzas().subscribe(
        (result: any) => {
          this.pizzas = result.data;  
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

  openPizzaCardModal(pizza: IPizza): void {
    const dialogRef = this.dialog.open(PizzaCardModalComponent, {
      width: '80%',
      data: { pizza: pizza }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The modal was closed');
    });
  }
}