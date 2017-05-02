import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PalestranteDescricaoWithNavBar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-palestrante-descricao-with-nav-bar',
  templateUrl: 'palestrante-descricao-with-nav-bar.html'
})
export class PalestranteDescricaoWithNavBarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PalestranteDescricaoWithNavBarPage');
  }

}
