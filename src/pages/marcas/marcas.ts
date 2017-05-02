import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { Login } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import { AngularFire } from 'angularfire2';
import {Subject} from 'rxjs/Subject';


/**
 * Generated class for the Marcas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-marcas',
  templateUrl: 'marcas.html',
})
export class Marcas {

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
  constructor(public navCtrl: NavController, public navParams: NavParams ,public storage: Storage ,public alertCtrl: AlertController,public af:AngularFire) {
    this.initializeItems();
    this.af.database.list('/BaseConsultar' ,{ preserveSnapshot: true})
        .subscribe(snapshots=>{
          this.baseConsultar=[];
            snapshots.forEach(snapshot => {
              const data = snapshot.val() ; 
              data.id = snapshot.key ; 
            this.baseConsultar.push(data);
            //console.log(this.publicidad);
             console.log("key ="+snapshot.key);
             console.log("Value ="+ JSON.stringify(snapshot.val()));
            });
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Marcas');
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
                this.datosMarcas = queriedItems;
              });

               if(this.tipoUsuario === "VENDEDOR"){
                console.log("busca vendedor");
                subject.next(this.rutaUsuario);  
              }else{
                console.log("busca gerente");
                subject.next(this.nombreUsuario);  
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



  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'London'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
