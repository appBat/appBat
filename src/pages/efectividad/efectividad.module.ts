import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Efectividad } from './efectividad';

@NgModule({
  declarations: [
    Efectividad,
  ],
  imports: [
    IonicPageModule.forChild(Efectividad),
  ],
  exports: [
    Efectividad
  ]
})
export class EfectividadModule {}
