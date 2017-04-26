import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class AconteceAgoraProvider {

  referencia;

  constructor(public http: Http) {
    this.inicializar();
  }

  inicializar(){
    this.referencia = firebase.database().ref('acontece-agora');
  }
}
