import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { Login } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import {Subject} from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';

/**
 * Generated class for the Ventas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class Ventas {

  //objeto que almacena los datos del usuario
  perfilUsuario :any  ; 
  //datosVentas
  datosVentasMarca :any ; 
  datosVentasSku:any ; 
  rutaUsuario :any ; 
  tipoUsuario :any ; 
  nombreUsuario:any;
  buscaPor :any ;
  constructor(public navCtrl: NavController, public navParams: NavParams , public storage:Storage,public alertCtrl: AlertController ,public af :AngularFire ) {
   this.buscaPor =  "marca";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ventas');
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
            let data = val.split(",");
         let rutaData = data[2].split(":");
         let tipousuarioData = data[3].split(":");
         let nombreData = data[4].split(":");
         let filtraPor = "ruta";
         this.rutaUsuario =  rutaData[1].substr(1,rutaData[1].length-2);
         this.tipoUsuario = tipousuarioData[1].substr(1,tipousuarioData[1].length-2) ; 
         this.nombreUsuario = nombreData[1].substr(1,nombreData[1].length-4);
         console.log("datos usuario  ");
         console.log(val);
         console.log("ruta="+ this.rutaUsuario );
         console.log("tipo="+ this.tipoUsuario );
         console.log("nombre="+ this.nombreUsuario );
          if(this.tipoUsuario === "VENDEDOR"){
            filtraPor = "ruta";
            console.log("filtra por ruta");
          }else{
            filtraPor = "gerente";
            console.log("filtra por gerente");
          }
             console.log("usuario logueado");

             const subject = new Subject(); // import {Subject} from 'rxjs/Subject';
              const queryObservable = this.af.database.list('/BaseObjetivos', {
                query: {
                  orderByChild: filtraPor,
                  equalTo: subject 
                }
              });

              // subscribe to changes
              queryObservable.subscribe(queriedItems => {
                console.log("resultado = ");

                console.log(queriedItems);  

                console.log(JSON.stringify(queriedItems));  

                //this.datosEfectividad = JSON.stringify(queriedItems);
                this.datosVentasMarca = queriedItems;
              });

               if(this.tipoUsuario === "VENDEDOR"){
                console.log("busca vendedor");
                subject.next(this.rutaUsuario);  
              }else{
                console.log("busca gerente");
                subject.next(this.nombreUsuario);  
              }


              const subjectSku = new Subject(); // import {Subject} from 'rxjs/Subject';
              const queryObservableSku = this.af.database.list('/BaseConsultar', {
                query: {
                  orderByChild: filtraPor,
                  equalTo: subjectSku 
                }
              });

              // subscribe to changes
              queryObservableSku.subscribe(queriedItems1 => {
                console.log("resultado sku  = ");

                console.log(queriedItems1);  

                console.log(JSON.stringify(queriedItems1));  

                //this.datosEfectividad = JSON.stringify(queriedItems);
                this.datosVentasSku = queriedItems1;
              });

              // trigger the query
            
               if(this.tipoUsuario === "VENDEDOR"){
                console.log("busca vendedor");
                subjectSku.next(this.rutaUsuario);  
              }else{
                console.log("busca gerente");
                subjectSku.next(this.nombreUsuario);  
              }


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

}
