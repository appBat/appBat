import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//import { AboutPage } from '../pages/about/about';
//import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { Ventas } from '../pages/ventas/ventas';
import { Marcas } from '../pages/marcas/marcas';
import { Login } from '../pages/login/login';
import { Efectividad } from '../pages/efectividad/efectividad';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage';
import {FilterPipe} from "../pages/pipes/filterPipe"


//CONEXION A LA BASE DE DATOS 
export const firebaseConfig = {
    apiKey: "AIzaSyATSG5oWbvlUil5IC3PfVwBx8OptoZGz2c",
    authDomain: "appbat-c410e.firebaseapp.com",
    databaseURL: "https://appbat-c410e.firebaseio.com",
    projectId: "appbat-c410e",
    storageBucket: "appbat-c410e.appspot.com",
    messagingSenderId: "584637669161"
 };
 //inicializa la base de datos 
 firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    Ventas,
    Marcas,
    Efectividad,
    Login,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: true}), //permite que las tabs se oculten en la ventana de login
    AngularFireModule.initializeApp(firebaseConfig) ,//agrega modulo 
     IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    Ventas,
    Marcas,
    Efectividad,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
