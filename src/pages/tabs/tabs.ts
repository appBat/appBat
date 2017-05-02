import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Ventas } from '../ventas/ventas';
import { Marcas } from '../marcas/marcas';
import { Efectividad } from '../efectividad/efectividad';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Ventas;
  tab2Root = Marcas;
  tab3Root = Efectividad;

  constructor() {

  }
}
