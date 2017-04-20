import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class PalestranteProvider {

  referencia;

  constructor(public http: Http) {
    this.inicializar();
  }

  private inicializar(){
      this.referencia = firebase.database().ref('palestrantes');
  }

}
