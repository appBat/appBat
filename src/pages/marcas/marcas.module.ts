import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Marcas } from './marcas';

@NgModule({
  declarations: [
    Marcas,
  ],
  imports: [
    IonicPageModule.forChild(Marcas),
  ],
  exports: [
    Marcas
  ]
})
export class MarcasModule {}
