import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColeccionPage } from './coleccion.page';

const routes: Routes = [
  {
    path: '',
    component: ColeccionPage
  },
  {
    path: 'form-coleccion',
    loadChildren: () => import('./form-coleccion/form-coleccion.module').then( m => m.FormColeccionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColeccionPageRoutingModule {}
