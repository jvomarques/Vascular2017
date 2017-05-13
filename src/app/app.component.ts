import { Push } from './../model/push';
import { SobrePage } from './../pages/sobre/sobre';
import { PaginaNotificacoesPage } from './../pages/pagina-notificacoes/pagina-notificacoes';
import { Component, ViewChild } from '@angular/core';
import { Platform, LoadingController, Nav, AlertController, IonicApp } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';

import firebase from 'firebase'; 

import {OneSignal} from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  dados_push:any;

  constructor(platform: Platform, public loadingCtrl: LoadingController, private _OneSignal: OneSignal,
              private alertCtrl: AlertController, public app: IonicApp) {

    //Declarações usadasd no método para verificar se existe usuario logado no dispositivo
    let loader = this.loadingCtrl.create();
    loader.present();
    this.listenToUserStatusUpdate(loader);
    let fireBaseUser = firebase.auth().currentUser;
    this.rootPage = fireBaseUser ? HomePage : LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      //Alterar id do onesiganl antes de publicar
      this._OneSignal.startInit("179625a1-2e35-471f-af7e-a168f9aa3585", "536954348713");
      this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
      this._OneSignal.setSubscription(true);
      this._OneSignal.handleNotificationReceived().subscribe(data => {
        // handle received here how you wish.
        let push:Push;
        // push = JSON.parse(JSON.stringify(data.payload.additionalData));
        //       let alert = this.alertCtrl.create({
        //       title: 'Falha de login',
        //       subTitle: "JSON 1: "+ push.nome,
        //       buttons: ['Ok']
        //     });
        //      alert.present();
        this.nav.push(PaginaNotificacoesPage, {data: data.payload.additionalData});
             

      });
      this._OneSignal.handleNotificationOpened().subscribe(data => {
        // console.log(data.notification.payload.additionalData);
        //   let alert = this.alertCtrl.create({
        //       title: 'Falha de login',
        //       subTitle: "JSON 2: "+data.notification.payload.additionalData,
        //       buttons: ['Ok']
        //     });
        //      alert.present();
        // this.nav.push(PaginaNotificacoesPage, {data: data.notification.payload.additionalData.file});
      });
      this._OneSignal.endInit(); 
    });
    
  }
  
  //Método para verificar se existe usuario logado no dispositivo
  listenToUserStatusUpdate(loader: any) {
      firebase.auth().onAuthStateChanged((user) => {
        if(loader)
          loader.dismiss();
  
        if (user) 
          this.rootPage = HomePage;
        else 
          this.rootPage = LoginPage;
      });
  }
}
