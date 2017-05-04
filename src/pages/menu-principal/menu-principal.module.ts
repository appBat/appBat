import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPrincipal } from './menu-principal';

@NgModule({
  declarations: [
    MenuPrincipal,
  ],
  imports: [
    IonicPageModule.forChild(MenuPrincipal),
  ],
  exports: [
    MenuPrincipal
  ]
})
export class MenuPrincipalModule {}
