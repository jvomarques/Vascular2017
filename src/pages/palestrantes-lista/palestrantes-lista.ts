import { PalestranteDescricaoWithNavBarPage } from './../palestrante-descricao-with-nav-bar/palestrante-descricao-with-nav-bar';
import { Programacao } from './../../model/programacao';
import { PalestranteProgramacao } from './../../model/palestrante-programacao';
import { ProgramacaoProvider } from './../../providers/programacao-provider';
import { PalestranteProgramacaoProvider } from './../../providers/palestrante-programacao-provider';
import { PalestranteDescricaoPage } from './../palestrante-descricao/palestrante-descricao';
import { PalestranteProvider } from './../../providers/palestrante-provider';
import { Palestrante } from './../../model/palestrante';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-palestrantes-lista',
  templateUrl: 'palestrantes-lista.html'
})
export class PalestrantesListaPage {
  
  palestrantes:Array<Palestrante>;

  //Vetor responsável por receber os dados da tabela palestrante-programacao
  palestrates_programacoes: Array<PalestranteProgramacao>;

  programacoes: Array<Programacao>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public palestranteProvider: PalestranteProvider,  public ngZone: NgZone,
              public palestranteProgramacaoProvider: PalestranteProgramacaoProvider,
              public programacaoProvider: ProgramacaoProvider) {
                  this.palestrates_programacoes = new Array<PalestranteProgramacao>();
                  this.programacoes = new Array<Programacao>();
              }

  ionViewDidLoad() {
    
      this.palestranteProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.palestrantes = innerArray;
      })
    })

    //RETORNANDO LISTA COM OS DADOS DA TABELA PALESTRANTE-PROGRAMACAO
    this.palestranteProgramacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.palestrates_programacoes = innerArray;
      })
    })


    //RETORNANDO LISTA COM OS DADOS DA TABELA PROGRAMACOES
    this.programacaoProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
        let innerArray = new Array();
        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        this.programacoes = innerArray;
      })
    })
  }

  abrirDescricaoPalestrante(palestrante){

      let palestrante_atual:Palestrante;

      for(let i = 0; i < this.palestrantes.length; i++)
        if(this.palestrantes[i].nome == palestrante.nome)
          palestrante_atual = this.palestrantes[i];

      this.navCtrl.push(PalestranteDescricaoWithNavBarPage, {
        param1: palestrante_atual, palestrantes: this.palestrantes, 
        palestrates_programacoes: this.palestrates_programacoes, programacoes: this.programacoes
      });
    
  }

}
