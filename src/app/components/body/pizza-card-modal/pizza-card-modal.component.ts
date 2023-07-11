import { Component, Inject, Input, OnInit, SimpleChanges } from "@angular/core";
import { IPizza } from "src/app/models/pizza.model";
import { ITopping } from "src/app/models/topping.model";
import { PizzaService } from "src/app/services/pizza.services";
import { ToppingService } from "src/app/services/topping.services";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
    selector: 'app-pizza-card-modal',
    templateUrl: './pizza-card-modal.component.html',
    styleUrls: ['./pizza-card-modal.component.scss']
})

export class PizzaCardModalComponent implements OnInit {
  @Input() pizza: IPizza | undefined;
  allToppings: ITopping[] = [];
  pizzaToppings: ITopping[] = [];
  toppings: ITopping[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PizzaCardModalComponent>,
    private pizzaService: PizzaService, 
    private toppingService: ToppingService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
      this.pizza = data.pizza;
    }

  ngOnInit(): void {
    this.pizzaService.pizzaToppingAdded.subscribe((topping: ITopping) => {
    this.toppings.push(topping);
  });

  this.pizzaService.pizzaToppingRemoved.subscribe((id: string) => {
    const index = this.toppings.findIndex(topping => topping.id === id);
    if (index !== -1) {
      this.toppings.splice(index, 1);
    }
  });
    
    this.getAllToppings();
    this.getToppingsForPizza();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getToppingsForPizza(): void {
    if (this.pizza) {
      this.pizzaService.getToppingsForPizza(this.pizza.id).subscribe((response: any) => {
        this.pizzaToppings = response.data;
      });
    }
  }

  removeToppingFromPizza(topping: ITopping): void {
    if (this.pizza) {
      this.pizzaService.deleteToppingFromPizza(this.pizza.id, topping.id).subscribe(
        () => {
          this.pizza!.toppings = this.pizza!.toppings?.filter(t => t.id !== topping.id);
          this.pizzaService.pizzaToppingRemoved.emit(topping.id);
          this.snackBar.open('Topping removed successfully', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top'
          });
        },
        error => {
          this.snackBar.open("Error while removing", 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      );
    }
  }

  getAllToppings(): void {
    this.toppingService.getAllToppings().subscribe(toppings => {
      this.allToppings = toppings;
    });
  }

  addToppingToPizza(topping: ITopping): void {
    if (this.pizza) {
      this.pizzaService.addToppingToPizza(this.pizza.id, topping.id).subscribe(
        updatedPizza => {
          this.pizza!.toppings = updatedPizza.toppings;
          this.snackBar.open('Topping added successfully', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top'
          });
        },
        error => {
          this.snackBar.open('Error adding topping', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      );
    }
  }
}