import { Turismo } from './../../model/turismo';
import { TurismoProvider } from './../../providers/turismo-provider';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-turismo',
  templateUrl: 'turismo.html'
})
export class TurismoPage {

  turismos:Array<Turismo>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public turismoProvider: TurismoProvider, public ngZone: NgZone) {}

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

}
