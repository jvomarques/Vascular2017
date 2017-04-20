import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Agenda} from "../model/agenda";

import firebase from "firebase";

@Injectable()
export class AgendaProvider {

  referencia;

  constructor(public http: Http) {
    this.inicializar();
  }

  private inicializar(){
    this.referencia = firebase.database().ref('agenda');
  }

  salvarAgenda(agenda: Agenda){
      let idRef;
      idRef = this.referencia.push().key;
      agenda.idReferencia = idRef;
      this.referencia.child(idRef).update(agenda);
  }

}
