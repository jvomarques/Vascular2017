import { UsuarioEditarPage } from './../usuario-editar/usuario-editar';
import { UsuarioProvider } from './../../providers/usuario-provider';
import { Usuario } from './../../model/usuario';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html'
})
export class PerfilUsuarioPage {


  usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ngZone: NgZone,  public usuarioProvider: UsuarioProvider) {

              this.usuario = navParams.get('param1'); 
  }

  ionViewDidLoad() {

  }

  abrirUsuarioEditar(){

        this.navCtrl.push(UsuarioEditarPage, {
        param1: this.usuario
      });
      
  }

}
