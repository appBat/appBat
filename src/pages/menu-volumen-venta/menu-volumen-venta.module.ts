import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuVolumenVenta } from './menu-volumen-venta';

@NgModule({
  declarations: [
    MenuVolumenVenta,
  ],
  imports: [
    IonicPageModule.forChild(MenuVolumenVenta),
  ],
  exports: [
    MenuVolumenVenta
  ]
})
export class MenuVolumenVentaModule {}
