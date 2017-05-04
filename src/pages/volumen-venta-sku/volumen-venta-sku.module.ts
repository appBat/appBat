import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolumenVentaSku } from './volumen-venta-sku';

@NgModule({
  declarations: [
    VolumenVentaSku,
  ],
  imports: [
    IonicPageModule.forChild(VolumenVentaSku),
  ],
  exports: [
    VolumenVentaSku
  ]
})
export class VolumenVentaSkuModule {}
