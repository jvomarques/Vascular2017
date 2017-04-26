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

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    this.isAndroid = platform.is('android');
    this.agendaCietifica = AgendaCientificaPage;
    this.agendaSocial = AgendaSocialPage;
    this.agendaComissoes = AgendaComissoesPage;
  }

  ionViewDidLoad() {
    
  }

}