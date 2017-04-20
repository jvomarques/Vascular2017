import { ProgramacaoCompletaPage } from './../../pages/programacao-completa/programacao-completa';
import { ProgramacaoProvider } from './../../providers/programacao-provider';
import { Programacao } from './../../model/programacao';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  //  <ion-header>
  //     <ion-navbar color="navbarColor">
  //       <ion-title></ion-title>
  //     </ion-navbar>
  //   </ion-header>

  selector: 'programacao-tabs',
  template: `
  
  <ion-content>
    
      <ion-list class="list-avatar-page" *ngFor="let programacao of programacoes">
        
        <ion-list-header>{{programacao.data}}</ion-list-header>

        <ion-item>
          <ion-avatar item-left>
            <img src="{{programacao.imagem}}">
          </ion-avatar>
          <h2>{{programacao.titulo}}</h2>
          <p>{{programacao.tipo}}</p>
          <button ion-button clear item-right (click)="abrirProgramacao(this.programacao)">Ver</button>
          <ion-note item-right>{{programacao.horario}}</ion-note>
        </ion-item>

      </ion-list>
    
  </ion-content>
  `
})
export class ProgramacaoTabsPage1 {

  programacoes:Array<Programacao>;
  programacao_cientifica:Array<Programacao>;
  programacao_social:Array<Programacao>;
  programacao_comissoes:Array<Programacao>;
  programacao_por_data = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public programacaoProvider: ProgramacaoProvider, public ngZone: NgZone) {
                 
              }
              
  inicializar() {

  }

  

  removeItem(array, item){
      for(var i in array){
          if(array[i]==item){
              array.splice(i,1);
              break;
          }
      }
  }

  ionViewDidLoad() {
      
      this.programacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          if(el.tipo == "Cientifica")
            innerArray.push(el);
        })
        this.programacoes = innerArray;
      })
    })

    let aux = new Array();
    for(let i = 0; i < this.programacoes.length; i++)
      if(this.programacoes[i].tipo == "Cientifica")
        aux.push(this.programacoes[i]);

    this.programacao_cientifica = aux;

    /*AGRUPANDO POR DATAS*/ 
    //console.log("Tamanho do meu Array: " + this.programacoes.length);

    // let programacoes_data_aux =[];
    
    // for(let i = 0; i < this.programacoes.length; i++)
    //   programacoes_data_aux[i] = this.programacoes[i].data;
    
    // let programacoes_data = programacoes_data_aux.filter(function(este, i) {
    //     return programacoes_data_aux.indexOf(este) == i;
    // })
    
    // let programacoes_aux = this.programacoes;
    
    // let a = [];

    // for(let i = 0; i < programacoes_aux.length; i++)
    // {
    //   a = [];
      
    //   for(let j = 0; j < this.programacoes.length; j++)
    //     if(this.programacoes[j].data == programacoes_aux[i].data)
    //       a.push(programacoes_aux[j]);

    //   this.removeItem(programacoes_aux, programacoes_aux[i]);
    //   this.programacao_por_data.push(a);
    // }

    //for(let i = 0; i < this.programacao_por_data.length; i++)
      //console.log(this.programacao_por_data[i]);
  
  }

  abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        param1: info
      });
  }

}

/*---------------------------------------------------------------------------------------------------*/

@Component({
  selector: 'programacao-tabs',
  template: `
  
  <ion-content>
    
      <ion-list class="list-avatar-page" *ngFor="let programacao of programacoes">
        
        <ion-list-header>{{programacao.data}}</ion-list-header>

        <ion-item>
          <ion-avatar item-left>
            <img src="{{programacao.imagem}}">
          </ion-avatar>
          <h2>{{programacao.titulo}}</h2>
          <p>{{programacao.tipo}}</p>
          <button ion-button clear item-right (click)="abrirProgramacao(this.programacao)">Ver</button>
          <ion-note item-right>{{programacao.horario}}</ion-note>
        </ion-item>

      </ion-list>
    
  </ion-content>
  `
})
export class ProgramacaoTabsPage2 {
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public programacaoProvider: ProgramacaoProvider, public ngZone: NgZone) {
                 
              }

  programacoes:Array<Programacao>;
  programacao_cientifica:Array<Programacao>;
  programacao_social:Array<Programacao>;
  programacao_comissoes:Array<Programacao>;
  programacao_por_data = [[]];


  ionViewDidLoad() {
      this.programacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          if(el.tipo == "Social")
            innerArray.push(el);
        })
        this.programacoes = innerArray;
      })
    })

    let aux = new Array();
    for(let i = 0; i < this.programacoes.length; i++)
      if(this.programacoes[i].tipo == "Social")
        aux.push(this.programacoes[i]);

    this.programacao_social = aux;
  }

  abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        param1: info
      });
  }

}

/*---------------------------------------------------------------------------------------------------*/

@Component({
  selector: 'programacao-tabs',
  template: `
  
  <ion-content>
    
      <ion-list class="list-avatar-page" *ngFor="let programacao of programacoes">
        
        <ion-list-header>{{programacao.data}}</ion-list-header>

        <ion-item>
          <ion-avatar item-left>
            <img src="{{programacao.imagem}}">
          </ion-avatar>
          <h2>{{programacao.titulo}}</h2>
          <p>{{programacao.tipo}}</p>
          <button ion-button clear item-right (click)="abrirProgramacao(this.programacao)">Ver</button>
          <ion-note item-right>{{programacao.horario}}</ion-note>
        </ion-item>

      </ion-list>
    
  </ion-content>
  `
})
export class ProgramacaoTabsPage3 {
constructor(public navCtrl: NavController, public navParams: NavParams,
              public programacaoProvider: ProgramacaoProvider, public ngZone: NgZone) {
                 
              }

  programacoes:Array<Programacao>;
  programacao_cientifica:Array<Programacao>;
  programacao_social:Array<Programacao>;
  programacao_comissoes:Array<Programacao>;
  programacao_por_data = [[]];


  ionViewDidLoad() {
      this.programacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          if(el.tipo == "Comissões")
            innerArray.push(el);
        })
        this.programacoes = innerArray;
      })
    })

    let aux = new Array();
    for(let i = 0; i < this.programacoes.length; i++)
      if(this.programacoes[i].tipo == "Comissões")
        aux.push(this.programacoes[i]);

    this.programacao_comissoes = aux;
  }

  abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        param1: info
      });
  }

}
