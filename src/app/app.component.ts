import { Component, ViewChild } from '@angular/core';
import { Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';

import firebase from 'firebase'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(NavController) nav: NavController;
  rootPage:any;

  constructor(platform: Platform, public loadingCtrl: LoadingController) {

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
