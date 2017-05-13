import { Programacao } from './../../model/programacao';
import { ProgramacaoProvider } from './../../providers/programacao-provider';
import { SobreAppPage } from './../sobre-app/sobre-app';
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

import { NavController, AlertController, PopoverController, NavParams, Platform } from 'ionic-angular';

import {InfomacoesListaPage} from '../infogerais/infogerais';

import firebase from "firebase";

// import { InAppBrowser } from 'ionic-native';


@Component({
  template: 
  `
      <ion-list>
        <button ion-item (click)="abrirPerfilUsuario()">Meu perfil</button>
        <button ion-item (click)="abrirSobreApp()">Sobre</button>
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
                this.usuarios = new Array<Usuario>();
                this.usuario_atual = new Usuario();
                this.usuario_email_atual = firebase.auth().currentUser.email;
                
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

    for(let i = 0; i < this.usuarios.length; i++)
      console.log("Usuarios (email): " + this.usuarios[i].email);

    console.log("Tamanho: " + this.usuarios.length);
    
    //Pegando o usuario com email igual ao email da autenticação
    for(let i = 0; i < this.usuarios.length; i++)
      if(this.usuarios[i].email == this.usuario_email_atual)
      {
        console.log("Entrou");
        this.usuario_atual = this.usuarios[i];
        break;
      }

      console.log("Usuario firebase emamil: " + this.usuario_email_atual);

      console.log("Usuario atual nome: " + this.usuario_atual.nome);
    //Passando usuario atual para a pagina de perfil de usuario
    this.navCtrl.push(PerfilUsuarioPage, {
      param1: this.usuario_atual
    });
  }

  abrirSobreApp(){
    this.navCtrl.push(SobreAppPage);
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


  programacoes:Array<Programacao>;

  programacoes_sociais:Array<Programacao>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
            public ngZone: NgZone,  public usuarioProvider: UsuarioProvider,
            public popoverCtrl: PopoverController, private programacaoProvider: ProgramacaoProvider,
            public platform: Platform) {

    this.programacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
            let innerArray = new Array();
            snapshot.forEach(elemento => {
              let el = elemento.val();
              innerArray.push(el);
            })
            this.programacoes = innerArray;
          })
        })

      this.programacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
            let innerArray = new Array();
            snapshot.forEach(elemento => {
              let el = elemento.val();
              if(el.tipo == "Social")
                innerArray.push(el);
            })
            this.programacoes_sociais = innerArray;
          })
        })

    }

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
    this.navCtrl.push(ProgramacaoListaPage, {programacoes: this.programacoes, programacoes_sociais: this.programacoes_sociais});
  }

  abrirAgenda(){
      this.navCtrl.push(AgendaPage, {programacoes: this.programacoes});
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
    // this.platform.ready().then(() => {
    //     let ref = new InAppBrowser('http://lisaiceland.com/','_blank');
    //     ref.on('exit').subscribe(() => {
    //       console.log('Exit In-App Browser');
    //     });
    //   });
    // }
    }


 

}
