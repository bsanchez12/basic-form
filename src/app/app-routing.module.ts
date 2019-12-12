import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { BookComponent } from './book/book.component';


const routes: Routes = [{
  path: 'form',
  component: FormComponent
},
{
  path: 'form/:id',
  component: FormComponent
},
{
  path: 'book',
  component: BookComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
