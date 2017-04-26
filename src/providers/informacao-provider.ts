import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

import {LoginProvider} from './loginprovider';

import {Informacao} from '../model/informacao';

@Injectable()
export class InformacaoProvider {

  referencia;

  constructor(public http: Http, public loginProvider :LoginProvider) {
    this.inicializar();
  }

  teste():Array<Informacao>{
    return new Array();
  }

  private inicializar(){
    //this.referencia = firebase.database().ref(this.loginProvider.usuario_atual.uid+'/informacoes');
    this.referencia = firebase.database().ref('informacoes');
  }

  salvarInformacao(informacao: Informacao){
      let idRef;

      // Update
      if(informacao.idReferencia != undefined)
        idRef = informacao.idReferencia;
      //Insert
      else
      {
          idRef = this.referencia.push().key;
          informacao.idReferencia = idRef;
      }
      this.referencia.child(idRef).update(informacao);
  }

  deletarInformacao(informacao: Informacao):any{
      return this.referencia.child(informacao.idReferencia).remove();
  }


}
