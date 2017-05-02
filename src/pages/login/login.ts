import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import {Subject} from 'rxjs/Subject';
import { Storage } from '@ionic/storage';




/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  infoUsuario :any ; 
  //variable que almacena el nombre del usuario
  usuario:any ;
  //varaible que alamacena la clave  
  clave:any ; 
  //amacena la informacion del usuario logueado
  dataUsuario :any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public af :AngularFire ,public alertCtrl: AlertController  ,public storage: Storage) {
  	      //inicializa clave en vacio
  		  this.clave = ""; 

		  this.infoUsuario = af.database.list('/Usuarios', { preserveSnapshot: true });
		  this.infoUsuario
		  .subscribe(snapshots => {
		    snapshots.forEach(snapshot => {
		      console.log(snapshot.key);
		      console.log(snapshot.val());
		    });
		  })


  }



  //funcion que se ejecuta para realizar el login 
  login(){
  	   console.log(this.usuario);
  	   //let user= this.usuario ;
  	    //objeto para realizar consulta 
  	    const subject = new Subject(); // import {Subject} from 'rxjs/Subject';
  	    //obejto query  donde se define la tabla a la que se consultara 'Usuarios' 
		const queryObservable = this.af.database.list('/Usuarios', {
		  query: {
		    orderByChild: 'ruta',
		    equalTo: subject 
		  }
		});
		
		//Cfuncion que se ejecuta  cuando llega la respuesta de la consulta 
		queryObservable.subscribe(queriedItems => {
	      console.log("resultado");
		  //console.log(queriedItems);  
		  //console.log(JSON.stringify(queriedItems));  
		  //alamacena el resultado convertido en JSON
		  let t   = JSON.stringify(queriedItems); 	
		   //si el resultado es [] no existe el usuario					    
		   if( t != '[]'){
		   	//objeto para consulta de la clave
		   	const subject1 = new Subject(); // import {Subject} from 'rxjs/Subject';
			const queryObservable = this.af.database.list('/Usuarios', {
			  query: {
			    orderByChild: 'cedula',
			    equalTo: subject1 
			  }
			});
			
			// subscribe to changes
			queryObservable.subscribe(queriedItems1 => {
		      console.log("resultado clave ");
		     
			   console.log(queriedItems1);  
			    
			 // console.log(JSON.stringify(queriedItems1));
			  let d  = JSON.stringify(queriedItems1)  ;
			  this.dataUsuario = JSON.stringify(queriedItems1) ;
			  console.log(this.dataUsuario.ruta);
			  if(d === undefined  || d  === null || d === '[]'  ){
			  	console.log("clave INCORRECTA");
			  	this.mostrarMensajeClaveInvalida();
			  }else{
			  	console.log("clave CORRECTA ");
			  	console.log("ruta=" +JSON.stringify(queriedItems1));
			  	 
			  	
			  	    this.storage.ready().then(() => {

				       // set a key/value
				       this.storage.set('user', JSON.stringify(queriedItems1));
				       this.navCtrl.pop();

				      
				     });
			  	
			  }
			 // console.log(JSON.stringify(this.dataUsuario.cedula) + " --- " + this.clave  );


			});

			// trigger the query
			subject1.next(this.clave);
		   }else{
		   	 console.log("usuario no existe");
		   	 this.mostrarMensajeUsuarioNoExiste();
		   }

		});

		// trigger the query
		subject.next(this.usuario);
		// re-trigger the query!!!
		//subject.next('small');
  }

    mostrarMensajeUsuarioNoExiste() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: 'Usuario no existe',
      buttons: ['OK']
    });
    alert.present();
  }

   mostrarMensajeClaveInvalida() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: 'Clave invalida',
      buttons: ['OK']
    });
    alert.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
