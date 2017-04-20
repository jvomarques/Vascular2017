import { PalestranteDescricaoPage } from './../palestrante-descricao/palestrante-descricao';
import { PalestranteProvider } from './../../providers/palestrante-provider';
import { Palestrante } from './../../model/palestrante';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-palestrantes-lista',
  templateUrl: 'palestrantes-lista.html'
})
export class PalestrantesListaPage {
  
  palestrantes:Array<Palestrante>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public palestranteProvider: PalestranteProvider,  public ngZone: NgZone) {}

  ionViewDidLoad() {
    
      this.palestranteProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.palestrantes = innerArray;
      })
    })
  }

  abrirDescricaoPalestrante(palestrante){

      let palestrante_atual:Palestrante;

      for(let i = 0; i < this.palestrantes.length; i++)
        if(this.palestrantes[i].nome == palestrante.nome)
          palestrante_atual = this.palestrantes[i];

      this.navCtrl.push(PalestranteDescricaoPage, {
        param1: palestrante_atual
      });
    
  }

}
