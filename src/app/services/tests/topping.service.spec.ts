import { TestBed } from '@angular/core/testing';
import { ToppingService } from '../topping.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ITopping } from '../../models/topping.model';
import { environment } from '../../../environments/environment.prod';

describe('ToppingService', () => {
    let service: ToppingService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule
            ],
            providers: [
                ToppingService
            ]
        });
        service = TestBed.inject(ToppingService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); 
    });
    test('should be created', () => {
        expect(service).toBeTruthy();
    });

    test('should fetch all toppings', () => {
        const mockedToppings: ITopping[] = [
            { id: '1', name: 'Tomato' },
            { id: '2', name: 'Cheese' },
            { id: '3', name: 'Pepperoni' }
        ];
    
        service.getAllToppings().subscribe(toppings => {
            expect(toppings.length).toBe(mockedToppings.length);
            expect(toppings).toEqual(mockedToppings);
        });
    
        const req = httpMock.expectOne(`${environment.PIZZA_API}/toppings`);
        expect(req.request.method).toBe('GET');
        req.flush(mockedToppings); 
    });

    test('should fetch topping by id', () => {
        const mockTopping: ITopping = {
            id: '17F0181B-D488-412F-B3C2-65E841134C44',
            name: 'Tomato',
        };

        service.getToppingById('17F0181B-D488-412F-B3C2-65E841134C44').subscribe(topping => {
            expect(topping).toEqual(mockTopping);
        });

        const req = httpMock.expectOne(`${environment.PIZZA_API}/toppings/17F0181B-D488-412F-B3C2-65E841134C44`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTopping); 
    });

    test('should create a topping', () => {
        const newTopping: ITopping = {
            id: '12345',
            name: 'Chuño',
        };
    
        service.addTopping(newTopping).subscribe(topping => {
            expect(topping).toEqual(newTopping);
        });
    
        const req = httpMock.expectOne(`${environment.PIZZA_API}/toppings`);
        expect(req.request.method).toBe('POST');
        req.flush(newTopping); 
    });

    test('should update a topping', () => {
        const updatedTopping: ITopping = {
            id: '12345',
            name: 'Updated Chuño',
        };
    
        service.updateTopping(updatedTopping.id, updatedTopping).subscribe(topping => {
            expect(topping).toEqual(updatedTopping);
        });
    
        const req = httpMock.expectOne(`${environment.PIZZA_API}/toppings/${updatedTopping.id}`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedTopping); 
    });

    test('should delete a topping', () => {
        const id = '17F0181B-D488-412F-B3C2-65E841134C44'; 
    
        service.deleteTopping(id).subscribe(res => {
            expect(res).toEqual({status: 'success'});
        });
    
        const req = httpMock.expectOne(`${environment.PIZZA_API}/toppings/${id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({status: 'success'}); 
    });
});