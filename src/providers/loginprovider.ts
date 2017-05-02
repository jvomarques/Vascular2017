import { AgendaProvider } from './agenda-provider';
import { AgendaPage } from './../pages/agenda/agenda';
import { LoginPage } from './../pages/login/login';
import { Usuario } from './../model/usuario';
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import {Credencial} from "../model/credencial";
import {Agenda} from "../model/agenda";

import firebase from "firebase";

@Injectable()
export class LoginProvider {

  usuario_atual: any;
  autenticado: boolean;

  referencia;

  loginSucessoEventEmitter: EventEmitter<any>;
  loginFalhaEventEmitter: EventEmitter<any>;
  logoutEventEmitter: EventEmitter<any>;

  registroSucessoEventEmitter: EventEmitter<any>;
  registroFalhaEventEmitter: EventEmitter<any>;

  //NgZone eh utilizado para armazenar o atual estado de login
  constructor(public http: Http, public ngZone: NgZone, public alertCtrl: AlertController,
              public agendaProvider: AgendaProvider)
  {
      this.loginSucessoEventEmitter = new EventEmitter();
      this.loginFalhaEventEmitter = new EventEmitter();
      this.logoutEventEmitter = new EventEmitter();

      this.registroSucessoEventEmitter = new EventEmitter();
      this.registroFalhaEventEmitter = new EventEmitter();

      this.referencia = firebase.database().ref('usuario');
      
      //Metodo para ouvir as mudanças de estado de autenticação no Firebase
      firebase.auth().onAuthStateChanged(usuario => {
        this.callbackStateChange(usuario);
      })
  }

  //Metodo para ouvir as mudanças de estado de autenticação no Firebase
  private callbackStateChange(usuario)
  {
      this.ngZone.run( () => {
          if(usuario == null)
          {
              this.usuario_atual == null;
              this.autenticado = false;
          }
          else
          {
            this.usuario_atual = usuario;
            this.autenticado = true;
          }
      })
  }

  loginComCredencial(credencial: Credencial)
  {
      if(credencial.email != null && credencial.senha != null)
      {
        firebase.auth().signInWithEmailAndPassword(credencial.email, credencial.senha)
        .then(resultado => this.callbackSucessoLogin(resultado))
        .catch(erro => this.callbackFalhaoLogin(erro));
      }
      else
      {
        let alert = this.alertCtrl.create({
          title: 'Falha de login',
          subTitle: 'Preencha todos os campos.',
          buttons: ['Ok']
        });
         alert.present();
      }

  }

  loginComGoogle()
  {
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(erro => this.callbackFalhaoLogin(erro));
  }

  loginComFacebook()
  {
      let provider = new firebase.auth.FacebookAuthProvider();

      return firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(erro => this.callbackFalhaoLogin(erro));
  }

  registrarUsuario(credencial: Credencial, usuario: Usuario)
  {
      if(credencial.senha != credencial.senha_confirmacao)
      {
          let alert = this.alertCtrl.create({
          title: 'Falha de cadastro',
          subTitle: 'As senhas não conferem',
          buttons: ['Ok']
        });
         alert.present();

         return false;
      }
      else if(credencial.email != null || credencial.senha != null 
              || credencial.senha_confirmacao != null 
              || usuario.cpf != null || usuario.nome != null)
      {
        //CADASTRO DE USUARIO NO FIREBASE
        firebase.auth().createUserWithEmailAndPassword(credencial.email, credencial.senha)
        .then(result => this.callbackSucessoRegistro(result))
        .catch(error => this.callbackFalhaoRegistro(error));

        console.log("Usuario: " + usuario.nome);
        //CADASTRO DE USUARIO NA TABELA USUARIO
        let idRef;
        idRef = this.referencia.push().key;
        usuario.idReferencia = idRef;
        this.referencia.child(idRef).update(usuario);
        console.log("registrou");
        return true;
        
      }
      else
      {
        let alert = this.alertCtrl.create({
          title: 'Falha de cadastro',
          subTitle: 'Preencha todos os campos.',
          buttons: ['Ok']
        });
         alert.present();

         return false;
      }
  }

  private callbackSucessoLogin(response)
  {
    this.loginSucessoEventEmitter.emit(response.user);
  }

  private callbackFalhaoLogin(error)
  {
    this.loginFalhaEventEmitter.emit({code: error.code, message: error.message, email: error.email, credencial: error.credencial});
  }

  private callbackSucessoRegistro(response)
  {
    this.registroSucessoEventEmitter.emit(response.user);
  }

  private callbackFalhaoRegistro(error)
  {
    this.registroFalhaEventEmitter.emit({code: error.code, message: error.message, email: error.email, credencial: error.credencial});
  }

  logoutUsuario(){
    firebase.auth().signOut()
    .then( () => this.logoutEventEmitter.emit(true))
    .catch(error => this.callbackFalhaoLogin(error))
  }
}
