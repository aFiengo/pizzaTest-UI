import { Component, OnInit } from '@angular/core';
import { ITopping } from '../../../models/topping.model';
import { ToppingService } from '../../../services/topping.services';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-topping-list',
  templateUrl: './topping-list.component.html',
  styleUrls: ['./topping-list.component.scss']
})
export class ToppingListComponent implements OnInit {
  toppings: ITopping[] = [];
  newTopping: ITopping = {id: '', name: ''};

  constructor(private toppingService: ToppingService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.toppingService.toppingAdded.subscribe((topping: ITopping) => {
      this.toppings.push(topping);
    });

    this.toppingService.toppingRemoved.subscribe((id: string) => {
      const index = this.toppings.findIndex(topping => topping.id === id);
      if (index !== -1) {
        this.toppings.splice(index, 1);
      }
    });
    this.getToppings();
  }

  getToppings(): void {
    this.toppingService.getAllToppings().subscribe((toppings: ITopping[]) => {
      this.toppings = toppings;
    });
  }

  addTopping(topping: ITopping): void {
    this.toppingService.addTopping(topping)
      .pipe(
        switchMap(() => this.toppingService.getAllToppings())
      )
      .subscribe(toppings => {
        this.toppings = toppings;
        this.newTopping = { id: '', name: '' }; 
        this.snackBar.open('Topping added successfully', 'Close', {
          duration: 2000, verticalPosition: 'top'
        });
      });
  }

  removeTopping(topping: ITopping): void {
    this.toppingService.deleteTopping(topping.id).subscribe(
      () => {
        this.toppingService.toppingRemoved.emit(topping.id);
        this.snackBar.open('Topping removed successfully', 'Dismiss', {
          duration: 3000, verticalPosition: 'top'
        });
      },
      error => {
        this.snackBar.open("You can't revome this topping, It's associated with many pizzas", 'Dismiss', {
          duration: 3000, verticalPosition: 'top'
        });
      }
    );
  }
}