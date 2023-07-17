import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToppingListComponent } from './topping-list.component';
import { ToppingService } from '../../../services/topping.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ITopping } from '../../../models/topping.model';

describe('ToppingListComponent', () => {
    let component: ToppingListComponent;
    let fixture: ComponentFixture<ToppingListComponent>;
    let mockToppingService: jasmine.SpyObj<ToppingService>;
    let mockSnackBar;

    beforeEach(async () => {
        mockToppingService = jasmine.createSpyObj('ToppingService', ['getAllToppings', 'addTopping', 'deleteTopping']);
        mockSnackBar = jasmine.createSpyObj(['open']);

        await TestBed.configureTestingModule({
            declarations: [ToppingListComponent],
            providers: [
                { provide: ToppingService, useValue: mockToppingService },
                { provide: MatSnackBar, useValue: mockSnackBar },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToppingListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load toppings on init', () => {
        const mockToppings: ITopping[] = [
            { id: '1', name: 'Mushrooms' },
            { id: '2', name: 'Pepperoni' }
        ];
        mockToppingService.getAllToppings.and.returnValue(of(mockToppings));

        component.ngOnInit();

        expect(component.toppings.length).toBe(2);
        expect(component.toppings).toEqual(mockToppings);
    });
});