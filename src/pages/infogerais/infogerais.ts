import { Informacao } from './../../model/informacao';
import { InformacaoCompletaPage } from './../informacao-completa/informacao-completa';
import { Component, NgZone  } from '@angular/core';
import { NavController, NavParams, ToastController  } from 'ionic-angular';

import {InformacaoProvider} from '../../providers/informacao-provider';
//import {Informacao} from '../../model/informacao';

import {InformacaoAddPage} from '../informacao-add/informacao-add'

import {InformacaoItemComponent} from '../../components/informacao-item/informacao-item';

@Component({
  selector: 'page-infogerais',
  templateUrl: 'infogerais.html'
})
export class InfomacoesListaPage {

  informacoes:Array<Informacao>;
  id_informacao:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ngZone: NgZone, public informacaoProvider: InformacaoProvider,
              public toastCtrl: ToastController) {}

  ionViewDidLoad() {

    /*
     * value - Escuta todas as alterações da referencia
     * child_added - Ouvinte para quando um filtlo for adicionado
     * child_changed - Ouvinte para quando algum filtlo for alterado
     * child_removed - Ouvinte para quando algum filho for deletado
     * child_moved - Ouvinte para ouvir as mudanças na prioridade de um filho

    this.informacaoProvider.referencia.on('child_removed', (snapshot) => {
      let tarefaRemovida = snapshot.val();
      this.toastCtrl.create({
        message: 'Tarefa '+tarefaRemovida.titulo+' removida!',
        duration: 3000
      }).present();
    })
    */

    this.informacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.informacoes = innerArray;
      })
    })

  }

  abrirInformacaoAdd(){
    this.navCtrl.push(InformacaoAddPage);
  }

  abrirInformacaoCompleta(info){
      
      let info_atual:Informacao;

      for(let i = 0; i < this.informacoes.length; i++)
        if(this.informacoes[i].idReferencia == info.idReferencia)
          info_atual = this.informacoes[i];

      
      this.navCtrl.push(InformacaoCompletaPage, {
        param1: info_atual, param2: 'Teste'
      });
      
  }

  
}
