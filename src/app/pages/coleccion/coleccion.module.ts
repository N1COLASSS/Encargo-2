import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColeccionPageRoutingModule } from './coleccion-routing.module';

import { ColeccionPage } from './coleccion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColeccionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ColeccionPage]
})
export class ColeccionPageModule {}
