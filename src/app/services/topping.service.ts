import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ITopping } from '../models/topping.model';
import { environment } from '../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToppingService {

  toppingAdded = new EventEmitter<ITopping>();
  toppingRemoved = new EventEmitter<string>();
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAllToppings(): Observable<ITopping[]> {
    return this.http.get<ITopping[]>(`${environment.PIZZA_API}/toppings`).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getToppingById(id: string): Observable<ITopping> {
    return this.http.get<ITopping>(`${environment.PIZZA_API}/toppings/${id}`)
    .pipe(catchError(this.handleError));
  }

  addTopping(topping: ITopping): Observable<ITopping> {
    topping.id = this.generateGUID();
    return this.http.post<ITopping>(`${environment.PIZZA_API}/toppings`, topping)
    .pipe(catchError(this.handleError));
  }

  updateTopping(id: string, topping: ITopping): Observable<ITopping> {
    return this.http.put<ITopping>(`${environment.PIZZA_API}/toppings/${id}`, topping)
    .pipe(catchError(this.handleError));
  }

  deleteTopping(id: string): Observable<{}> {
    return this.http.delete<ITopping>(`${environment.PIZZA_API}/toppings/${id}`)
    .pipe(catchError(this.handleError));
  }

  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
  }
}