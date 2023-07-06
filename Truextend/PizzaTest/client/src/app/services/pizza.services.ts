import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'https://localhost:8050/api/pizzas';  // URL to your backend API

  constructor(private http: HttpClient) { }

  getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.apiUrl}/pizzas`);
  }

  // Add other methods as needed (for example, to get a specific pizza, update a pizza, etc.)
}