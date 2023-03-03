import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DrillingopsComponent} from './drillingops/drillingops.component';
const routes: Routes = [
  {
    path:'',
    component: DrillingopsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
