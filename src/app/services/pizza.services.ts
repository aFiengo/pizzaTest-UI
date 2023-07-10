import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, pipe, tap, throwError } from 'rxjs';
import { IPizza } from '../models/pizza.model';
import { ITopping } from '../models/topping.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {  

  constructor(private http: HttpClient) { }

  getAllPizzas(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(`${environment.PIZZA_API}/pizzas`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(Response))),
      catchError(this.handleError)
      );
}

  getPizzaById(id: string): Observable<IPizza> {
    return this.http.get<IPizza>(`${environment.PIZZA_API}/pizzas/${id}`)
      .pipe(catchError(this.handleError));
  }

  getToppingsForPizza(id: string): Observable<ITopping[]> {
    return this.http.get<ITopping[]>(`${environment.PIZZA_API}/pizzas/${id}/toppings`)
      .pipe(catchError(this.handleError));
  }

  updatePizza(pizza: IPizza): Observable<IPizza> {
    return this.http.put<IPizza>(`${environment.PIZZA_API}/pizzas/${pizza.id}`, pizza)
      .pipe(catchError(this.handleError));
  }

  addToppingToPizza(pizzaId: string, toppingId: string): Observable<IPizza> {
    return this.http.post<IPizza>(`${environment.PIZZA_API}/pizzas/${pizzaId}/toppings/${toppingId}`, {})
      .pipe(catchError(this.handleError));
  }

  deleteToppingFromPizza(pizzaId: string, toppingId: string): Observable<{}> {
    return this.http.delete(`${environment.PIZZA_API}/pizzas/${pizzaId}/toppings/${toppingId}`)
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