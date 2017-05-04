import { TurismoDescricaoPage } from './../turismo-descricao/turismo-descricao';
import { Turismo } from './../../model/turismo';
import { TurismoProvider } from './../../providers/turismo-provider';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as $ from "jquery";
import 'slick-carousel/slick/slick';


@Component({
  selector: 'page-turismo',
  templateUrl: 'turismo.html'
})
export class TurismoPage {

  turismos:Array<Turismo>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public turismoProvider: TurismoProvider, public ngZone: NgZone) {}


  ngOnInit() {
let homeOptions = {
    initialSlide: 0,
    loop: true,
    autoplay:2000,
    autoplayDisableOnInteraction: false
  };


  }

  ionViewDidLoad() {
    
    this.turismoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.turismos = innerArray;
      })
    })

  }

  abrirSaibaMaisTurismo(turismo){

      let turismo_atual:Turismo;

      for(let i = 0; i < this.turismos.length; i++)
        if(this.turismos[i].idReferencia == turismo.idReferencia)
          turismo_atual = this.turismos[i];

      this.navCtrl.push(TurismoDescricaoPage, {
        param1: turismo_atual
      });
  }

}
