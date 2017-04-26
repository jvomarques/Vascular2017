import { AconteceAgora } from './../../model/acontece-agora';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AconteceAgoraDescricao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-acontece-agora-descricao',
  templateUrl: 'acontece-agora-descricao.html'
})
export class AconteceAgoraDescricaoPage {

  acontece_agora: AconteceAgora;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.acontece_agora = navParams.get('param1'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AconteceAgoraDescricaoPage');
  }

}
