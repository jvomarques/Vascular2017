import { Usuario } from './../model/usuario';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class UsuarioProvider {
  
  referencia;

  constructor(public http: Http) {
    this.inicializar();
  }

  private inicializar(){
    
    this.referencia = firebase.database().ref('usuario');
  }

  editarUsuario(usuario:Usuario)
  {
    let idRef;

    //Update
    if(usuario.idReferencia != undefined)
      idRef = usuario.idReferencia;
    
    this.referencia.child(idRef).update(usuario);
  }
}
