import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzaListComponent } from './pizza-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('PizzaListComponent', () => {
    let component: PizzaListComponent;
    let fixture: ComponentFixture<PizzaListComponent>;
    let matDialogMock = {
        open: () => { 
            return {
                afterClosed: () => of(null)
            } 
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ PizzaListComponent ],
        imports: [ HttpClientTestingModule],
        providers: [
            { provide: MatDialog, useValue: matDialogMock }, 
        ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PizzaListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });
});