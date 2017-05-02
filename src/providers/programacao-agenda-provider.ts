import { ProgramacaoAgenda } from './../model/programacao-agenda';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class ProgramacaoAgendaProvider {

  referencia;

  constructor(public http: Http) {
    this.referencia = firebase.database().ref('programacao-agenda');
  }

  adicionarProgramacaoAgenda(programacao_agenda:ProgramacaoAgenda){
      let idRef;

      idRef = this.referencia.push().key;
      programacao_agenda.idReferencia = idRef;
      this.referencia.child(idRef).update(programacao_agenda);
  }

  deletarProgramacaAgenda(programacao_agenda:ProgramacaoAgenda){
    return this.referencia.child(programacao_agenda.idReferencia).remove();
  }

}
