import { TestBed } from '@angular/core/testing';
import { ToppingService } from '../topping.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ITopping } from '../../models/topping.model';

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
        console.log(httpMock);
    });

    afterEach(() => {
        httpMock.verify(); 
    });
    test('should be created', () => {
        expect(service).toBeTruthy();
    });

    test('should fetch topping by id', () => {
        const mockTopping: ITopping = {
            id: '17F0181B-D488-412F-B3C2-65E841134C44',
            name: 'Tomato',
        };

        service.getToppingById('17F0181B-D488-412F-B3C2-65E841134C44').subscribe(topping => {
            expect(topping).toEqual(mockTopping);
        });

        const req = httpMock.expectOne(`https://localhost:8050/api/toppings/17F0181B-D488-412F-B3C2-65E841134C44`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTopping); 
    });
});