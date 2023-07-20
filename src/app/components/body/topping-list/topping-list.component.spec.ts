import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToppingListComponent } from './topping-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ToppingService } from '../../../services/topping.service';
import { throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ITopping } from '../../../models/topping.model';
import { environment } from '../../../../environments/environment.prod';


describe('ToppingListComponent', () => {
    let component: ToppingListComponent;
    let fixture: ComponentFixture<ToppingListComponent>;
    let httpTestingController: HttpTestingController;
    let toppingService: ToppingService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ ToppingListComponent ],
        imports: [ HttpClientTestingModule,
            MatSnackBarModule,
            TableModule,
            MatIconModule,
            FormsModule],
        providers: [ ToppingService ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToppingListComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.inject(HttpTestingController);
        toppingService = TestBed.inject(ToppingService);
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    test('should call addTopping and update topping list when add button is clicked', () => {
        const addToppingSpy = jest.spyOn(component, 'addTopping');
        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();

        expect(addToppingSpy).toHaveBeenCalled();
    });

    test('should update the input value when typing in the new topping input', () => {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    
        inputElement.value = 'Bacon';
        inputElement.dispatchEvent(new Event('input'));
    
        fixture.detectChanges();
    
        expect(inputElement.value).toBe('Bacon');
    });

    test('should call removeTopping and update topping list when remove button is clicked', () => {
        component.toppings = [
            { id: '1', name: 'Tomato' },
            { id: '2', name: 'Cheese' },
            { id: '3', name: 'Pepperoni' }
        ];
        fixture.detectChanges(); 
    
        const removeToppingSpy = jest.spyOn(component, 'removeTopping');
        const button = fixture.debugElement.nativeElement.querySelector('button'); 
        button.click();
    
        fixture.detectChanges();

        expect(removeToppingSpy).toHaveBeenCalled();
    });

    test('should get error if trying to remove a topping that belongs to more than one pizza', () => {
        const mockTopping: ITopping = { id: '1', name: 'Cheese' };

        const snackBarSpy = jest.spyOn(component.snackBar, 'open');
        component.removeTopping(mockTopping);

        const req = httpTestingController.expectOne(`${environment.PIZZA_API}/toppings/${mockTopping.id}`);

        const mockErrorMsg = 'This topping belongs to more than one pizza and cannot be deleted';
        req.flush(mockErrorMsg, { status: 400, statusText: 'Bad Request' });

        expect(snackBarSpy).toHaveBeenCalledWith("You can't remove this topping, It's associated with many pizzas", 'Dismiss', {
            duration: 3000, verticalPosition: 'top'
        });
    });

    test('should update newTopping when input is changed', () => {
        let input = fixture.debugElement.nativeElement.querySelector('input');
        input.value = 'New Topping';
        input.dispatchEvent(new Event('input'));

        expect(component.newTopping.name).toBe('New Topping');
    });
});