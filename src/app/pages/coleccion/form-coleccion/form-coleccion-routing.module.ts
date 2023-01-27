import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormColeccionPage } from './form-coleccion.page';

const routes: Routes = [
  {
    path: '',
    component: FormColeccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormColeccionPageRoutingModule {}
