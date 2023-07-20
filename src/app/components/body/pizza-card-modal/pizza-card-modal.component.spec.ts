import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzaCardModalComponent } from './pizza-card-modal.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PizzaCardModalComponent', () => {
    let component: PizzaCardModalComponent;
    let fixture: ComponentFixture<PizzaCardModalComponent>;

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
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PizzaCardModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });
});