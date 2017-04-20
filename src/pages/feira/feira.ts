import { FeiraDescricaoPage } from './../feira-descricao/feira-descricao';
import { FeiraProvider } from './../../providers/feira-provider';
import { Feira } from './../../model/feira';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-feira',
  templateUrl: 'feira.html'
})
export class FeiraPage {

  feiras:Array<Feira>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public feiraProvider: FeiraProvider, public ngZone: NgZone) {}

  ionViewDidLoad() {

    //Listando todos os items da tabela feira
    this.feiraProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.feiras = innerArray;
      })
    })

  }

    abrirSaibaMaisFeira(feira){

      let feira_atual:Feira;

      for(let i = 0; i < this.feiras.length; i++)
        if(this.feiras[i].idReferencia == feira.idReferencia)
        {
          feira_atual = this.feiras[i];
          break;
        }

      this.navCtrl.push(FeiraDescricaoPage, {
        param1: feira_atual
      });
  }

}
