import { SobrePage } from './../sobre/sobre';
import { AconteceAgoraPage } from './../acontece-agora/acontece-agora';
import { FeiraPage } from './../feira/feira';
import { TurismoPage } from './../turismo/turismo';
import { AgendaPage } from './../agenda/agenda';
import { ProgramacaoListaPage } from './../programacao-lista/programacao-lista';
import { PalestrantesListaPage } from './../palestrantes-lista/palestrantes-lista';
import { LoginPage } from './../login/login';
import { OpcoesHomePage } from './../opcoes-home/opcoes-home';
import { UsuarioProvider } from './../../providers/usuario-provider';
import { Usuario } from './../../model/usuario';
import { PerfilUsuarioPage } from './../perfil-usuario/perfil-usuario';
import { LoginProvider } from './../../providers/loginprovider';
import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';

import { NavController, AlertController, PopoverController, NavParams } from 'ionic-angular';

import {InfomacoesListaPage} from '../infogerais/infogerais';

import firebase from "firebase";

@Component({
  template: 
  `
      <ion-list>
        <button ion-item (click)="abrirPerfilUsuario()">Meu perfil</button>
        <button ion-item (click)="abrirPerfilUsuario()">Sobre</button>
        <button ion-item (click)="logoutUsuario()">Sair</button>
      </ion-list>
    `
})
export class PopoverPage {


  usuarios:Array<Usuario>;
  usuario_email_atual = firebase.auth().currentUser.email;
  usuario_atual:Usuario;
  
  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public ngZone: NgZone,  public usuarioProvider: UsuarioProvider,
              public popoverCtrl: PopoverController,  public loginProvider: LoginProvider) {

  }

  ionViewDidLoad(){
          
      //Puxando todos os usuarios cadastrados no banco
      this.usuarioProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.usuarios = innerArray;
      })
    })

  }

  abrirOpcoes(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);

      popover.present({
        ev: ev
      });
  }

  abrirPerfilUsuario(){

    //Pegando o usuario com email igual ao email da autenticação
    for(let i = 0; i < this.usuarios.length; i++)
      if(this.usuarios[i].email == this.usuario_email_atual)
        this.usuario_atual = this.usuarios[i];

    //Passando usuario atual para a pagina de perfil de usuario
    this.navCtrl.push(PerfilUsuarioPage, {
      param1: this.usuario_atual
    });
  }

  logoutUsuario() {
      let alert = this.alertCtrl.create({
      title: 'Sair',
      message: 'Deseja realmente sair da aplicação?',
      buttons: [
        {
          text: 'Não',
          role: 'não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          role: 'sim',
          handler: () => {
                this.loginProvider.logoutUsuario();
                this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    alert.present();

  }
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
            public ngZone: NgZone,  public usuarioProvider: UsuarioProvider,
            public popoverCtrl: PopoverController) {}

  ionViewDidLoad(){}

  abrirOpcoes(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);

      popover.present({
        ev: ev
      });
  }

  abrirInfoGerais(){
    this.navCtrl.push(InfomacoesListaPage);
  }

  abrirPalestrantes(){
    this.navCtrl.push(PalestrantesListaPage);
  }

  abrirProgramacao(){
    this.navCtrl.push(ProgramacaoListaPage);
  }

  abrirAgenda(){
      this.navCtrl.push(AgendaPage);
  }

  abrirTurismo(){
      this.navCtrl.push(TurismoPage);
  }

  abrirFeira(){
      this.navCtrl.push(FeiraPage);
  }

  abrirAconteceAgora(){
      this.navCtrl.push(AconteceAgoraPage);
  }

  abrirSobre(){
      this.navCtrl.push(SobrePage);
  }

}
