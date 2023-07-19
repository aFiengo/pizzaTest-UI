import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToppingListComponent } from './topping-list.component';
import { ToppingService } from '../../../services/topping.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ITopping } from '../../../models/topping.model';

describe('ToppingListComponent', () => {
    let component: ToppingListComponent;
    let fixture: ComponentFixture<ToppingListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ ToppingListComponent ]
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
});