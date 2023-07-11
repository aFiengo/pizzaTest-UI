import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './components/body/pizza-list/pizza-list.component';
import { PizzaCardModalComponent } from './components/body/pizza-card-modal/pizza-card-modal.component';

const routes: Routes = [
  { path: 'pizzas', component: PizzaListComponent },
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
