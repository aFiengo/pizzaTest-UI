import { ComponentFixture, TestBed, flushMicrotasks } from '@angular/core/testing';
import { PizzaCardModalComponent } from './pizza-card-modal.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IPizza } from "src/app/models/pizza.model";
import { ITopping } from "src/app/models/topping.model";
import { PizzaService } from "../../../services/pizza.service";
import { EMPTY, of, throwError } from 'rxjs';
import { ToppingService } from '../../../services/topping.service';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('PizzaCardModalComponent', () => {
    let component: PizzaCardModalComponent;
    let fixture: ComponentFixture<PizzaCardModalComponent>;
    let pizzaService: PizzaService;
    let toppingService: ToppingService;
    let snackBar: MatSnackBar;
    const mockPizza = { 
        id: '1', 
        name: 'Margherita', 
        description: 'Classic Italian pizza with tomato, mozzarella, and basil', 
        smallImageUrl: 'https://example.com/pizza-margherita-small.jpg', 
        largeImageUrl: 'https://example.com/pizza-margherita-large.jpg',
        toppings: [
            { id: '1', name: 'Tomato' },
            { id: '2', name: 'Cheese' },
            { id: '3', name: 'Pepperoni' }
        ]
    };


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ PizzaCardModalComponent ],
            imports: [ HttpClientTestingModule,
                MatDialogModule,
                TableModule,
                MatIconModule,
                FormsModule,
                MatSnackBarModule ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: { pizza: mockPizza } }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PizzaCardModalComponent);
        component = fixture.componentInstance;
        pizzaService = TestBed.inject(PizzaService);
        toppingService = TestBed.inject(ToppingService);
        snackBar = TestBed.inject(MatSnackBar);

        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    /*test('should load the selected pizza toppings on init', () => {
        const mockPizzaToppings = [
            { id: '1', name: 'Tomato' },
            { id: '2', name: 'Cheese' },
            { id: '3', name: 'Pepperoni' }
        ]; 
        const getToppingsSpy = jest.spyOn(pizzaService, 'getToppingsForPizza').mockReturnValue(of(mockPizzaToppings));

        component.ngOnInit();

        expect(getToppingsSpy).toHaveBeenCalled();
        expect(component.pizzaToppings).toEqual(mockPizzaToppings);

    });*/

    test('should load all toppings on init', () => {
        const mockAllToppings = [
            { id: '1', name: 'Tomato' },
            { id: '2', name: 'Cheese' },
            { id: '3', name: 'Pepperoni' }
        ]; 
        const getAllToppingsSpy = jest.spyOn(toppingService, 'getAllToppings').mockReturnValue(of(mockAllToppings));
    
        component.ngOnInit();
    
        expect(getAllToppingsSpy).toHaveBeenCalled();
        expect(component.allToppings).toEqual(mockAllToppings);
    });

    /*test('should call addToppingToPizza and update topping list when add button is clicked',() => {
        const addToppingToPizzaSpy = jest.spyOn(component, 'addToppingToPizza');
        fixture.detectChanges();
        let button = fixture.debugElement.query(By.css('[data-test="addToppingButton"]')).nativeElement;
        button.click();

        expect(addToppingToPizzaSpy).toHaveBeenCalled();
    });*/

    test('should call removeTopping and update topping list when remove button is clicked', () => {
        component.pizzaToppings = [
            { id: '1', name: 'Tomato' },
            { id: '2', name: 'Cheese' },
            { id: '3', name: 'Pepperoni' }
        ];
        fixture.detectChanges(); 
    
        const removeToppingSpy = jest.spyOn(component, 'removeToppingFromPizza');
        const button = fixture.debugElement.nativeElement.querySelector('button'); 
        button.click();
    

        expect(removeToppingSpy).toHaveBeenCalled();
    });

    test('should open snack bar when topping is added successfully', () => {
        const mockTopping = { id: '4', name: 'Rice' };
        jest.spyOn(pizzaService, 'addToppingToPizza').mockReturnValue(of(mockPizza));
        const snackBarSpy = jest.spyOn(snackBar, 'open');
    
        component.addToppingToPizza(mockTopping);
    
        expect(snackBarSpy).toHaveBeenCalledWith('Topping added successfully', 'Dismiss', { duration: 3000, verticalPosition: 'top' });
    });
    
    test('should open snack bar when there is an error adding topping', () => {
        const mockTopping = { id: '1', name: 'Tomato' };
        jest.spyOn(pizzaService, 'addToppingToPizza').mockReturnValue(throwError('error'));
        const snackBarSpy = jest.spyOn(snackBar, 'open');
    
        component.addToppingToPizza(mockTopping);
    
        expect(snackBarSpy).toHaveBeenCalledWith('Error adding topping', 'Dismiss', { duration: 3000, verticalPosition: 'top' });
    });

});