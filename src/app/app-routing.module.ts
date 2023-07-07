import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './components/body/pizza-list/pizza-list.component';
import { PizzaCardComponent } from './components/body/pizza-card/pizza-card.component';

const routes: Routes = [
  { path: 'pizzas', component: PizzaListComponent },
  { path: 'pizzas/:id', component: PizzaCardComponent },
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
