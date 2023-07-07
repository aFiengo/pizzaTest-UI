import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITopping } from '../models/topping.model';

@Injectable({
  providedIn: 'root',
})
export class ToppingService {
  private apiUrl = 'http://localhost:8050/api/toppings';

  constructor(private http: HttpClient) {}

  getAllToppings(): Observable<ITopping[]> {
    return this.http.get<ITopping[]>(`${this.apiUrl}`).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getToppingById(id: string): Observable<ITopping> {
    return this.http.get<ITopping>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log('Get Topping: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addTopping(topping: ITopping): Observable<ITopping> {
    return this.http.post<ITopping>(`${this.apiUrl}`, topping).pipe(
      tap(data => console.log('Add Topping: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateTopping(id: string, topping: ITopping): Observable<ITopping> {
    return this.http.put<ITopping>(`${this.apiUrl}/${id}`, topping).pipe(
      tap(data => console.log('Update Topping: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteTopping(id: string): Observable<{}> {
    return this.http.delete<ITopping>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log('Delete Topping: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
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