import {Informacao} from "../../model/informacao";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ListProvider} from "../../providers/list-provider";

import {InformacaoProvider} from '../../providers/informacao-provider';

@Component({
  selector: 'page-informacao-add',
  templateUrl: 'informacao-add.html'
})
export class InformacaoAddPage {

  informacao:Informacao;

  informacaoForm:FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public listProvider: ListProvider,
              public informacaoProvider: InformacaoProvider) {
                this.informacao = new Informacao();
              }

  ionViewDidLoad() {
    this.informacao = this.navParams.get('informacao');

    if(!this.informacao) {
      this.informacao = new Informacao();
    }


  }

  salvarInformacao(){
    this.informacaoProvider.salvarInformacao(this.informacao);
  }

}
