import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class TurismoProvider {

  referencia;

  constructor(public http: Http) {
      this.inicializar();
  }

  private inicializar(){
      this.referencia = firebase.database().ref('turismo');
  }
}
