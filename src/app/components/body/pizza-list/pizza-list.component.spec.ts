import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzaListComponent } from './pizza-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

describe('PizzaListComponent', () => {
    let component: PizzaListComponent;
    let fixture: ComponentFixture<PizzaListComponent>;
    let dialog: MatDialog;
    let dialogSpy: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ PizzaListComponent ],
        imports: [ HttpClientTestingModule,
            ButtonModule],
        providers: [
            { provide: MatDialog, useValue: { open: jest.fn() } }, 
        ]
        })
        .compileComponents(); 
        dialog = TestBed.inject(MatDialog);

        const dialogRefStub: any = {
        afterClosed: () => of(null)
        };
    
        dialogSpy = jest.spyOn(dialog, 'open').mockReturnValue(dialogRefStub);
        
    });
    

    beforeEach(() => {
        fixture = TestBed.createComponent(PizzaListComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    test('should open pizza card modal when select pizza button is clicked', () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const pizzaCardButton = fixture.debugElement.query(By.css('button')).nativeElement;
            pizzaCardButton.click();

            expect(dialogSpy).toHaveBeenCalled();
        });
    });
    
    test('should store the selected pizza data when select pizza button is clicked', () => {
        const mockPizza = { id: '1', name: 'Margherita', 
        description: 'Classic Italian pizza with tomato, mozzarella, and basil', 
        smallImageUrl: 'https://example.com/pizza-margherita-small.jpg', 
        largeImageUrl: 'https://example.com/pizza-margherita-large.jpg'};
        
        component.openPizzaCardModal(mockPizza);
    
        expect(component.pizza).toBe(mockPizza);
    });
});