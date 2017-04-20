import { Informacao } from './../../model/informacao';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-informacao-completa',
  templateUrl: 'informacao-completa.html'
})
export class InformacaoCompletaPage {

  informacao: Informacao;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.informacao = navParams.get('param1'); 
  }

  ionViewDidLoad() {
    
  }

}
