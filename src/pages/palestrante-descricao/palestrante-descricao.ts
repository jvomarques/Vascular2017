import { ProgramacaoCompletaWithNavBarPage } from './../programacao-completa-with-nav-bar/programacao-completa-with-nav-bar';
import { Agenda } from './../../model/agenda';
import { Usuario } from './../../model/usuario';
import { ProgramacaoAgenda } from './../../model/programacao-agenda';
import { AgendaProvider } from './../../providers/agenda-provider';
import { UsuarioProvider } from './../../providers/usuario-provider';
import { ProgramacaoAgendaProvider } from './../../providers/programacao-agenda-provider';
import { ProgramacaoCompletaPage } from './../programacao-completa/programacao-completa';
import { Programacao } from './../../model/programacao';
import { PalestranteProgramacaoProvider } from './../../providers/palestrante-programacao-provider';
import { PalestranteProgramacao } from './../../model/palestrante-programacao';
import { ProgramacaoProvider } from './../../providers/programacao-provider';
import { Palestrante } from './../../model/palestrante';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-palestrante-descricao',
  templateUrl: 'palestrante-descricao.html'
})
export class PalestranteDescricaoPage {

  palestrante: Palestrante;

  //Vetor responsável por receber os dados da tabela palestrante-programacao
  palestrates_programacoes: Array<PalestranteProgramacao>;

  palestrates_programacoes_atual: Array<PalestranteProgramacao>;

  programacoes_por_palestrante: Array<Programacao>;

  id_programacoes: Array<string>;

  programacoes: Array<Programacao>;
  programacoes_atual: Array<Programacao>;
  
  palestrantes: Array<Palestrante>;

  //Vetores passados como parametros para opcao de abrir programacao completa
  programacoes_agenda: Array<ProgramacaoAgenda>;
  usuarios: Array<Usuario>;
  agendas: Array<Agenda>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public palestranteProgramacaoProvider: PalestranteProgramacaoProvider,
              public ngZone: NgZone, public programacaProvider: ProgramacaoProvider,
              public programacao_agendaProvider: ProgramacaoAgendaProvider, public usuarioProvider: UsuarioProvider,
              public agendaProvider: AgendaProvider) {

              this.palestrante = navParams.get('param1');
              this.palestrantes = navParams.get('palestrantes');
              this.palestrates_programacoes = navParams.get('palestrates_programacoes');
              this.programacoes = navParams.get('programacoes');

              this.programacoes_atual = new Array<Programacao>();
              this.id_programacoes = new Array<string>();
              this.palestrates_programacoes_atual = new Array<PalestranteProgramacao>();

              this.programacoes_agenda = new Array<ProgramacaoAgenda>();
              this.usuarios = new Array<Usuario>();
              this.agendas = new Array<Agenda>();
  }

  ionViewDidLoad() {

      //Puxando todos os dados da tabela programacao_agenda
      this.programacao_agendaProvider.referencia.on('value', (snapshot) => {
        this.ngZone.run( () => {
          let innerArray = new Array();
          snapshot.forEach(elemento => {
            let el = elemento.val();
            innerArray.push(el);
          })
          this.programacoes_agenda = innerArray;
        })
      })
      
      //Pegando todos os usuarios do banco
      this.usuarioProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
          let innerArray = new Array();
          snapshot.forEach(elemento => {
            let el = elemento.val();
            innerArray.push(el);
          })
          this.usuarios = innerArray;
        })
      })

      //Pegando todas as agendas do banco
      this.agendaProvider.referencia.on('value', (snapshot) => {
      this.ngZone.run( () => {
          let innerArray = new Array();
          snapshot.forEach(elemento => {
            let el = elemento.val();
            innerArray.push(el);
          })
          this.agendas = innerArray;
        })
      })


        //Pegando os valores da tabela auxiliar 'Palestrante-Programacao' de acordo com o palestrante atual
        for(let i = 0; i < this.palestrates_programacoes.length; i++)
            if(this.palestrates_programacoes[i].id_palestrante == this.palestrante.idReferencia)
                this.palestrates_programacoes_atual.push(this.palestrates_programacoes[i]);
        
        //Pegando o Id de todas as programacoes de acordo com a tabela auxiliar 'palestrante-programacao'
        for(let i = 0; i < this.palestrates_programacoes_atual.length; i++)
            this.id_programacoes.push(this.palestrates_programacoes_atual[i].id_programacao);
        
        for(let i = 0; i < this.id_programacoes.length; i++)
        {
            for(let j = 0; j < this.programacoes.length; j++)
            {
              if(this.id_programacoes[i] == this.programacoes[j].idReferencia)
              {
                this.programacoes_atual.push(this.programacoes[j]);
                break;
              }
            }
        }

        for(let i = 0; i < this.programacoes_atual.length; i++)
          console.log("Minhas programacoes: " + this.programacoes_atual[i]);
        

  }

  abrirProgramacao(info){
      console.log(info.imagem);
      this.navCtrl.push(ProgramacaoCompletaPage, {
        programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda
      });
  }

}
