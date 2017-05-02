import { Agenda } from './../../model/agenda';
import { AgendaProvider } from './../../providers/agenda-provider';
import { LoginPage } from './../login/login';
import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {LoginProvider} from "../../providers/loginprovider";

import {Credencial} from "../../model/credencial";

import {Usuario} from "../../model/usuario";


@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html'
})
export class RegistrarPage {

  credencial: Credencial;
  usuario: Usuario;
  agenda: Agenda;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loginProvider: LoginProvider, public alertCtrl: AlertController,
              public agendaProvider: AgendaProvider) {
              this.credencial = new Credencial();
              this.usuario = new Usuario();
              this.agenda = new Agenda();
  }

  ionViewDidLoad() {

    // this.credencial = new Credencial();
    // this.usuario = new Usuario();

    this.loginProvider.registroSucessoEventEmitter.subscribe(
      user =>
      {
        let alert = this.alertCtrl.create({
          title: 'Registro',
          subTitle: 'Registro concluído com sucesso.',
          buttons: ['Ok']
        });
         alert.present();
      }
    )

    this.loginProvider.registroFalhaEventEmitter.subscribe(
      error =>
      {
        console.log(error)
        if(error.message == "The email address is badly formatted.")
        {
          let alert = this.alertCtrl.create({
            title: 'Falha de registro',
            subTitle: 'Email em formato incorreto.',
            buttons: ['Ok']
          });
           alert.present();
        }

        if(error.message == "Password should be at least 6 characters")
        {
          let alert = this.alertCtrl.create({
            title: 'Falha de registro',
            subTitle: 'A senha deve possuir ao menos 6 dígitos.',
            buttons: ['Ok']
          });
           alert.present();
        }

        if(error.message == "The email address is already in use by another account.")
        {
          let alert = this.alertCtrl.create({
            title: 'Falha de registro',
            subTitle: 'Endereço de email já cadastrado.',
            buttons: ['Ok']
          });
           alert.present();
           
        }

      }
    )
  }

  fazRegistro(){

    //let erro;
    //this.loginProvider.registroFalhaEventEmitter.subscribe(error => {erro = error.message});
    
    this.loginProvider.registrarUsuario(this.credencial, this.usuario);
    
    //SETANDO VALORES DA AGENDA DE ACORDO COM USUARIO CADASTRADO
    this.agenda.email_usuario = this.usuario.email;
    this.agenda.id_usuario = this.usuario.idReferencia;

    //SALVANDO AGENDA
    this.agendaProvider.salvarAgenda(this.agenda);
  }


}
