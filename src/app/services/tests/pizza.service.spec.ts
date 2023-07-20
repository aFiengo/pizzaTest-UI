import { TestBed } from '@angular/core/testing';
import { PizzaService } from '../pizza.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ITopping } from '../../models/topping.model';
import { IPizza } from '../../models/pizza.model';
import { environment } from '../../../environments/environment.prod';

describe('PizzaService', () => {
    let service: PizzaService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            PizzaService
        ]
    });
    service = TestBed.inject(PizzaService);
    httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); 
    });

    test('should fetch all pizzas', () => {
        const mockPizzas: IPizza[] = [
            { id: '1', name: 'Margherita', 
            description: 'Classic Italian pizza with tomato, mozzarella, and basil', 
            smallImageUrl: 'https://example.com/pizza-margherita-small.jpg', 
            largeImageUrl: 'https://example.com/pizza-margherita-large.jpg'}, 

            { id: '2', name: 'Pepperoni', 
            description: 'Delicious pizza topped with pepperoni slices', 
            smallImageUrl: 'https://example.com/pepperoni-pizza-small.jpg', 
            largeImageUrl: 'https://example.com/pepperoni-pizza-large.jpg'},

            { id: '3', name: 'Vegetarian', 
            description: 'Healthy pizza loaded with fresh vegetables', 
            smallImageUrl: 'https://example.com/vegetarian-pizza-small.jpg', 
            largeImageUrl: 'https://example.com/vegetarian-pizza-large.jpg'}
        ];
        service.getAllPizzas().subscribe(pizzas => {
            expect(pizzas).toEqual(mockPizzas);
        });

        const req = httpMock.expectOne(`${environment.PIZZA_API}/pizzas`);
        expect(req.request.method).toBe('GET');
        req.flush(mockPizzas); 
    });

    test('should fetch pizza by id', () => {
        const mockPizza: IPizza = 
            { id: '1', name: 'Margherita', 
            description: 'Classic Italian pizza with tomato, mozzarella, and basil', 
            smallImageUrl: 'https://example.com/pizza-margherita-small.jpg', 
            largeImageUrl: 'https://example.com/pizza-margherita-large.jpg'};

        service.getPizzaById('1').subscribe(pizza => {
            expect(pizza).toEqual(mockPizza);
        });

        const req = httpMock.expectOne(`${environment.PIZZA_API}/pizzas/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockPizza); 
    });

    test('should fetch toppings for pizza', () => {
        const mockToppings: ITopping[] = [
            { id: '1', name: 'Tomato' },
            { id: '2', name: 'Cheese' },
            { id: '3', name: 'Pepperoni' }];

        service.getToppingsForPizza('1').subscribe(toppings => {
            expect(toppings).toEqual(mockToppings);
        });

        const req = httpMock.expectOne(`${environment.PIZZA_API}/pizzas/1/toppings`);
        expect(req.request.method).toBe('GET');
        req.flush(mockToppings);
    });

    test('should update pizza', () => {
        const mockPizza: IPizza = 
        { id: '1', name: 'Margherita', 
            description: 'Classic Italian pizza with tomato, mozzarella, and basil', 
            smallImageUrl: 'https://example.com/pizza-margherita-small.jpg', 
            largeImageUrl: 'https://example.com/pizza-margherita-large.jpg'};

        service.updatePizza(mockPizza).subscribe(pizza => {
            expect(pizza).toEqual(mockPizza);
        });

        const req = httpMock.expectOne(`${environment.PIZZA_API}/pizzas/1`);
        expect(req.request.method).toBe('PUT');
        req.flush(mockPizza);
    });

    test('should add topping to pizza', () => {
        const mockPizza: IPizza = 
        { id: '1', name: 'Margherita', 
        description: 'Classic Italian pizza with tomato, mozzarella, and basil', 
        smallImageUrl: 'https://example.com/pizza-margherita-small.jpg', 
        largeImageUrl: 'https://example.com/pizza-margherita-large.jpg'};

        service.addToppingToPizza('1', '1').subscribe(pizza => {
            expect(pizza).toEqual(mockPizza);
        });

        const req = httpMock.expectOne(`${environment.PIZZA_API}/pizzas/1/toppings/1`);
            expect(req.request.method).toBe('PUT');
        req.flush(mockPizza);
    });

    test('should delete topping from pizza', () => {
        service.deleteToppingFromPizza('1', '1').subscribe(res => {
        expect(res).toEqual({});
        });

        const req = httpMock.expectOne(`${environment.PIZZA_API}/pizzas/1/toppings/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });
});