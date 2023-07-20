import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToppingListComponent } from './topping-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


describe('ToppingListComponent', () => {
    let component: ToppingListComponent;
    let fixture: ComponentFixture<ToppingListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ ToppingListComponent ],
        imports: [ HttpClientTestingModule,
            MatSnackBarModule,
            TableModule,
            MatIconModule,
            FormsModule]
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