import { Programacao } from './../../model/programacao';
import { AgendaComissoesPage } from './../agenda-comissoes/agenda-comissoes';
import { AgendaSocialPage } from './../agenda-social/agenda-social';
import { AgendaCientificaPage } from './../agenda-cientifica/agenda-cientifica';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform  } from 'ionic-angular';

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {

  pet: string = "kittens";

  isAndroid: boolean = false;

  agendaCietifica: any;
  agendaSocial: any;
  agendaComissoes:any;

  progamacoes: Programacao;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    this.isAndroid = platform.is('android');
    
    this.progamacoes = navParams.get('programacoes');
    this.agendaCietifica = AgendaCientificaPage,{programacoes: this.progamacoes};
    this.agendaSocial = AgendaSocialPage;
    this.agendaComissoes = AgendaComissoesPage;
  }

  ionViewDidLoad() {
    
  }

}