import { Palestrante } from './../../model/palestrante';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PalestranteDescricao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-palestrante-descricao',
  templateUrl: 'palestrante-descricao.html'
})
export class PalestranteDescricaoPage {

  palestrante: Palestrante;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.palestrante = navParams.get('param1'); 
  }

  ionViewDidLoad() {

  }

}
