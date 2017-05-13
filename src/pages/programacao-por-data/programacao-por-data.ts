import { PalestranteProgramacao } from './../../model/palestrante-programacao';
import { ProgramacaoAgenda } from './../../model/programacao-agenda';
import { Palestrante } from './../../model/palestrante';
import { Agenda } from './../../model/agenda';
import { Usuario } from './../../model/usuario';
import { ProgramacaoCompletaPage } from './../programacao-completa/programacao-completa';
import { Programacao } from './../../model/programacao';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-programacao-por-data',
  templateUrl: 'programacao-por-data.html'
})
export class ProgramacaoPorDataPage {

  data;
  programacoes:Array<Programacao>;
  programacoes_por_data:Array<Programacao>;

  programacao_cientifica:Array<Programacao>;
  programacao_social:Array<Programacao>;
  programacao_comissoes:Array<Programacao>;
  programacao_por_data = [];

  usuarios:Array<Usuario>;
  agendas:Array<Agenda>;
  programacoes_agenda:Array<ProgramacaoAgenda>;

  //Vetor responsável por receber os dados da tabela palestrante-programacao
  palestrates_programacoes: Array<PalestranteProgramacao>;
    
  //Vetor responsável por receber os dados da tabela 'palestrantes'
  palestrantes: Array<Palestrante>;

  //USADO PARA DIFERENCIAR O BOTÃO DE ADICIONAR OU REMOVER PROGRAMACAO
  estouNaAgenda:boolean;
  textoBotaoAdd_Delete:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('data');
    this.usuarios = navParams.get('usuarios');
    this.agendas = navParams.get('agendas');
    this.programacoes_agenda = navParams.get('programacoes_agenda');
    this.programacoes = navParams.get('programacoes');
    this.estouNaAgenda = navParams.get('estouNaAgenda');
    this.palestrates_programacoes = navParams.get('palestrates_programacoes');
    this.palestrantes = navParams.get('palestrantes')

    this.programacoes_por_data = new Array<Programacao>();
  }

  ionViewDidLoad() {

    for(let i = 0; i < this.programacoes.length; i++)
      if(this.programacoes[i].data == this.data)
        this.programacoes_por_data.push(this.programacoes[i]);
        
  }

    abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes, estouNaAgenda: this.estouNaAgenda
      });
  }

}
