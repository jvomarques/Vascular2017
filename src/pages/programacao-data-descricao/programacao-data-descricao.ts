import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ProgramacaoDataDescricao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-programacao-data-descricao',
  templateUrl: 'programacao-data-descricao.html'
})
export class ProgramacaoDataDescricaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramacaoDataDescricaoPage');
  }

}
