import { ProgramacaoTabsPage1, ProgramacaoTabsPage2, ProgramacaoTabsPage3 } from './../../components/programacao-tabs/programacao-tabs';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

@Component({
  selector: 'page-programacao-lista',
  templateUrl: 'programacao-lista.html'
    // template: `
    // <ion-header>
    //   <ion-navbar>
    //     <ion-title>Programacao</ion-title>
    //   </ion-navbar>
    // </ion-header>
    
    // <ion-tabs>
    //   <ion-tab  [root]="tab1"></ion-tab>
    //   <ion-tab  [root]="tab2"></ion-tab>
    // </ion-tabs>`
})
export class ProgramacaoListaPage {

  @ViewChild('myTabs') tabRef: Tabs;

  ionViewDidEnter() {
    //this.tabRef.select(3);
  }

  tab1: any;
  tab2: any;
  tab3: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = ProgramacaoTabsPage1;
    this.tab2 = ProgramacaoTabsPage2;
    this.tab3 = ProgramacaoTabsPage3;
  }

  ionViewDidLoad() {

  }

  abrirProgramacao(event) {
    console.log("Teste");
    //event.setAttribute("aria-selected",true);
    //var value = object.getAttribute("aria-selected");

  }

}

