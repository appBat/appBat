import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController  } from 'ionic-angular';
import { Efectividad } from '../../pages/efectividad/efectividad';
import { AcercaDe } from '../../pages/acerca-de/acerca-de';
import { Marcas } from '../../pages/marcas/marcas';
import { MenuVolumenVenta } from '../../pages/menu-volumen-venta/menu-volumen-venta';
import { Storage } from '@ionic/storage';
import { AngularFire } from 'angularfire2';
import { Login } from '../../pages/login/login';
/**
 * Generated class for the MenuPrincipal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu-principal',
  templateUrl: 'menu-principal.html',
})
export class MenuPrincipal {

	 //objeto que almacena los datos del usuario
  perfilUsuario :any  ; 
   searchQuery: string = '';
  items: string[];
  baseConsultar :any  ;
  //datos marcas
  datosMarcas:any ;
  rutaUsuario :any ; 
  tipoUsuario :any ; 
  nombreUsuario :any ; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams ,public storage: Storage ,public alertCtrl: AlertController) {
  	 let tabs = document.querySelectorAll('.tabbar');
        if ( tabs !== null ) {
	        Object.keys(tabs).map((key) => {
	        tabs[ key ].style.transform = 'translateY(-100%)';
	        });
        }
  }

  efectividad(){
  	this.navCtrl.push(Efectividad);
  }
  marcas(){
  	this.navCtrl.push(Marcas);
  }
  volumenVenta(){
  	this.navCtrl.push(MenuVolumenVenta);
  }
  acercaDe(){
  	this.navCtrl.push(AcercaDe);
  }

     //meotod que se ejecuta cada vez que la vista se activa 
  ionViewWillEnter(){
     //inicia conexion al almacenamiento global
       this.storage.ready().then(() => {
       //se obtiene la tabla user 
       this.storage.get('user').then((val) => {
         //console.log('Your age is', val);
         //se alamacena la respuesta en el perfil del usuario
         //this.perfilUsuario = JSON.parse(val) ;
         this.perfilUsuario = val ;
        
         //console.log(JSON.stringify(this.perfilUsuario));
         //console.log("ruta = "+this.perfilUsuario.ruta);
         //si el valor es diferente de null significa que el usuario ya esta logueado
         if( this.perfilUsuario != undefined || this.perfilUsuario != null ){
   				console.log("login");


         }else{//si no es asi muestra la ventana de login
            console.log("usuario no log ");
            //abre ventan login 
           this.navCtrl.push(Login);
         }
          
       })
     });
   }


   //se ejecuta para cerrar la sesion
   cerrarSesion(){
        //eliminar el valor de la tabla local user para que no pueda ingresar
        this.storage.remove('user').then(() => {
        console.log('user has been removed');
        //setea el perfil de usuario en vacio 
        this.perfilUsuario = [] ;
        //muestra ventan de login
        this.navCtrl.push(Login);
    });
   }

    //funcion que muestra la ventana de confirmacion
   mostrarVentanaConfirmacion() {
    //crea ventana de confirmacion  
    let confirm = this.alertCtrl.create({
      title: 'Cerrar sesion',
      message: 'Esta seguro que desea cerrar sesion ? ',
      buttons: [
        {
          text: 'cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ok',
          handler: () => { //boton ok para cerrar sesion 
            console.log('Agree clicked');
            //ejecuta funcion de cerrar sesion
            this.cerrarSesion();
          }
        }
      ]
    });
    //muestra la ventana
    confirm.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPrincipal');
  }

}
