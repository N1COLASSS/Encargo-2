import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormColeccionPageRoutingModule } from './form-coleccion-routing.module';

import { FormColeccionPage } from './form-coleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormColeccionPageRoutingModule
  ],
  declarations: [FormColeccionPage]
})
export class FormColeccionPageModule {}
