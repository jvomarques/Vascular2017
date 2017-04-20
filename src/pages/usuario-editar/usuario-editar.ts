import { UsuarioProvider } from './../../providers/usuario-provider';
import { Usuario } from './../../model/usuario';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-usuario-editar',
  templateUrl: 'usuario-editar.html'
})
export class UsuarioEditarPage {

  usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public usuarioProvider: UsuarioProvider) {
    
      this.usuario = new Usuario();
  }

  ionViewDidLoad() {
    
      this.usuario = this.navParams.get('param1'); 
    
      if(!this.usuario) {
      this.usuario = new Usuario();
    }
    
  }


  editarUsuario(){
    this.usuarioProvider.editarUsuario(this.usuario);
  }

}
