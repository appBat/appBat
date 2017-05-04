import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ventas } from '../../pages/ventas/ventas';
import { VolumenVentaSku } from '../../pages/volumen-venta-sku/volumen-venta-sku';

/**
 * Generated class for the MenuVolumenVenta page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu-volumen-venta',
  templateUrl: 'menu-volumen-venta.html',
})
export class MenuVolumenVenta {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ventaMarca(){

  	this.navCtrl.push(Ventas);
  }
  ventaSku(){

  	this.navCtrl.push(VolumenVentaSku);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuVolumenVenta');
  }

}
