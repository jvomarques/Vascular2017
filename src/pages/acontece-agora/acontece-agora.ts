import { AconteceAgoraDescricaoPage } from './../acontece-agora-descricao/acontece-agora-descricao';
import { AconteceAgora } from './../../model/acontece-agora';
import { AconteceAgoraProvider } from './../../providers/acontece-agora-provider';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-acontece-agora',
  templateUrl: 'acontece-agora.html'
})
export class AconteceAgoraPage {

  acontece_lista:Array<AconteceAgora>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ngZone: NgZone, public aconteceagoraProvider: AconteceAgoraProvider,
              public toastCtrl: ToastController) {}

  ionViewDidLoad() 
  {

      this.aconteceagoraProvider.referencia.on('value', (snapshot) => {
        this.ngZone.run( () => {
          let innerArray = new Array();
          snapshot.forEach(elemento => {
            let el = elemento.val();
            innerArray.push(el);
          })
          this.acontece_lista = innerArray;
        })
      })

  }

    abrirAconteceAgoraCompleto(info){
      
      let acontece_atual:AconteceAgora;

      for(let i = 0; i < this.acontece_lista.length; i++)
        if(this.acontece_lista[i].idReferencia == info.idReferencia)
          acontece_atual = this.acontece_lista[i];
      
      this.navCtrl.push(AconteceAgoraDescricaoPage, {
        param1: acontece_atual
      });
      
  }

}
