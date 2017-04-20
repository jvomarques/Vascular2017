import { Turismo } from './../../model/turismo';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-turismo-descricao',
  templateUrl: 'turismo-descricao.html'
})
export class TurismoDescricaoPage {

  turismo: Turismo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.turismo = navParams.get('param1'); 
  }

  ionViewDidLoad() {
    
  }

}
