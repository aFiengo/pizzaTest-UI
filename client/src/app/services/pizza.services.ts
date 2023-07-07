import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, pipe, tap, throwError } from 'rxjs';
import { IPizza } from '../models/pizza.model';
import { Topping } from '../models/topping.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'https://localhost:8050/api/pizzas';  

  constructor(private http: HttpClient) { }

  getAllPizzasAsync(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(`${this.apiUrl}/`)
    .pipe(
        tap(data => {
            console.log('All Pizzas: ', JSON.stringify(data));
            return data;
        }),
        catchError(this.handleError)
    );
}

  getPizzaById(id: string): Observable<IPizza> {
    return this.http.get<IPizza>(`${this.apiUrl}/pizzas/${id}`)
      .pipe(catchError(this.handleError));
  }

  getToppingsForPizza(id: string): Observable<Topping[]> {
    return this.http.get<Topping[]>(`${this.apiUrl}/pizzas/${id}/toppings`)
      .pipe(catchError(this.handleError));
  }

  updatePizza(pizza: IPizza): Observable<IPizza> {
    return this.http.put<IPizza>(`${this.apiUrl}/pizzas/${pizza.id}`, pizza)
      .pipe(catchError(this.handleError));
  }

  addToppingToPizza(pizzaId: string, topping: Topping): Observable<IPizza> {
    return this.http.post<IPizza>(`${this.apiUrl}/pizzas/${pizzaId}/toppings`, topping)
      .pipe(catchError(this.handleError));
  }

  deleteToppingFromPizza(pizzaId: string, toppingId: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/pizzas/${pizzaId}/toppings/${toppingId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = 'An error occurred: ${err.error.message}';
    } else {
        errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
}
}