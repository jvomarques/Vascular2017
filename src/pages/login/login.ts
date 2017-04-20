import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {RegistrarPage} from '../registrar/registrar'

import {HomePage} from '../home/home'

import {LoginProvider} from "../../providers/loginprovider";

import {Credencial} from "../../model/credencial";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credencial: Credencial;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public loginProvider: LoginProvider)
              {
                this.credencial = new Credencial();
              }

  ionViewDidLoad() {

      this.credencial = new Credencial();
      this.loginProvider.loginSucessoEventEmitter.subscribe(
        user =>
        {
          this.navCtrl.setRoot(HomePage)
        }
      )
      this.loginProvider.loginFalhaEventEmitter.subscribe(
        error =>
        {
          console.log(error)
          if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted.")
          {
            let alert = this.alertCtrl.create({
              title: 'Falha de login',
              subTitle: 'Email não cadastrado.',
              buttons: ['Ok']
            });
             alert.present();
          }

          if(error.message == "The email address is badly formatted.")
          {
            let alert = this.alertCtrl.create({
              title: 'Falha de login',
              subTitle: 'Email em formato incorreto.',
              buttons: ['Ok']
            });
             alert.present();
          }

          if(error.message == "The password is invalid or the user does not have a password.")
          {
            let alert = this.alertCtrl.create({
              title: 'Falha de login',
              subTitle: 'Senha não confere com o endereço de email',
              buttons: ['Ok']
            });
             alert.present();
          }

        }
      )
  }

  loginComCredencial(){
    this.loginProvider.loginComCredencial(this.credencial);
  }

  loginComGoogle(){
    this.loginProvider.loginComGoogle();
  }

  loginComFacebook(){
    this.loginProvider.loginComFacebook();
  }


  abrirRegistro(){
    this.navCtrl.push(RegistrarPage);
  }

  abrirHome(){
    this.navCtrl.push(HomePage);
  }

}
