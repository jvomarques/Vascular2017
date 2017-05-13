import { ProgramacaoPorDataPage } from './../programacao-por-data/programacao-por-data';
import { PalestranteProgramacao } from './../../model/palestrante-programacao';
import { PalestranteProvider } from './../../providers/palestrante-provider';
import { PalestranteProgramacaoProvider } from './../../providers/palestrante-programacao-provider';
import { Palestrante } from './../../model/palestrante';
import { ProgramacaoCompletaPage } from './../programacao-completa/programacao-completa';
import { ProgramacaoProvider } from './../../providers/programacao-provider';
import { UsuarioProvider } from './../../providers/usuario-provider';
import { Usuario } from './../../model/usuario';
import { ProgramacaoAgendaProvider } from './../../providers/programacao-agenda-provider';
import { AgendaProvider } from './../../providers/agenda-provider';
import { Agenda } from './../../model/agenda';
import { ProgramacaoAgenda } from './../../model/programacao-agenda';
import { Programacao } from './../../model/programacao';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-agenda-cientifica',
  templateUrl: 'agenda-cientifica.html'
})
export class AgendaCientificaPage {

  programacoes:Array<Programacao>;
  programacoes_por_agenda:Array<Programacao>;
  
  agendas:Array<Agenda>;
  agenda_atual: Agenda;

  usuarios:Array<Usuario>;
  usuario_email_atual = firebase.auth().currentUser.email;
  usuario_atual:Usuario;

  programacoes_agenda:Array<ProgramacaoAgenda>;
  programacao_agenda_por_usuario:Array<ProgramacaoAgenda>;

  estouNaAgenda:boolean;

  palestrantes: Array<Palestrante>;
  palestrates_programacoes: Array<PalestranteProgramacao>;

  //Vetor responsável por receber valores da datas de programacoes
  programacoes_data;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public agendaProvider: AgendaProvider, public programacao_agendaProvider: ProgramacaoAgendaProvider,
              public ngZone: NgZone, public usuarioProvider: UsuarioProvider,
              public programacaoProvider: ProgramacaoProvider,
              public palestranteProgramacaoProvider: PalestranteProgramacaoProvider,
              public palestranteProvider: PalestranteProvider) {

                this.programacoes_por_agenda = new Array<Programacao>();
                this.programacao_agenda_por_usuario = new Array<ProgramacaoAgenda>();
                this.usuarios = new Array<Usuario>();
                this.agendas = new Array<Agenda>();
                this.programacoes_agenda = new Array<ProgramacaoAgenda>()
                
                this.estouNaAgenda = true;

                this.palestrantes = new Array<Palestrante>();
                this.palestrates_programacoes = new Array<PalestranteProgramacao>();
                        //RETORNANDO LISTA DE TODAS AS PROGRAMACOES DO TIPO CIENTIFICA
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
              }

  ionViewDidLoad() {

        this.estouNaAgenda = true;
        
        //RETORNANDO LISTA DE TODAS AS AGENDAS
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
            
        //RETORNANDO LISTA DE TODAS AS PROGRAMACOES DO TIPO CIENTIFICA
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

      //Puxando todos os usuarios cadastrados no banco
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

      //Puxando todos os daods da tabela programacao_agenda
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

      //RETORNANDO LISTA DE TODOS OS PALESTRANTES
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

      //Pegando o usuario com email igual ao email da autenticação
      for(let i = 0; i < this.usuarios.length; i++)
        if(this.usuarios[i].email == this.usuario_email_atual){
          this.usuario_atual = this.usuarios[i];
          break;
        }
      
      //Pegando a agenda atual de acordo com o usuario logado
      for(let i = 0; i < this.agendas.length; i++){
        if(this.agendas[i].email_usuario == this.usuario_atual.email){
          this.agenda_atual = this.agendas[i];
          break;
        }
      }

      //Pegando os valores da tabela programacao_agenda de acordo com a agenda atual
      for(let i = 0; i < this.programacoes_agenda.length; i++)
        if(this.programacoes_agenda[i].id_agenda == this.agenda_atual.idReferencia)
          this.programacao_agenda_por_usuario.push(this.programacoes_agenda[i]);

          
      for(let i = 0; i < this.programacoes.length; i++)
        for(let j = 0; j < this.programacao_agenda_por_usuario.length; j++) 
          if(this.programacoes[i].idReferencia == this.programacao_agenda_por_usuario[j].id_programacao)
            this.programacoes_por_agenda.push(this.programacoes[i]);


      /*AGRUPANDO POR DATAS*/ 
      console.log("Tamanho do meu Array: " + this.programacoes_por_agenda.length);

      let programacoes_data_aux =[];
      
      for(let i = 0; i < this.programacoes_por_agenda.length; i++)
        programacoes_data_aux[i] = this.programacoes_por_agenda[i].data;
      
      this.programacoes_data = programacoes_data_aux.filter(function(este, i) {
          return programacoes_data_aux.indexOf(este) == i;
      })

      
      console.log("Minhas programacoes")
      for(let j = 0; j < this.programacoes_por_agenda.length; j++) 
        console.log(this.programacoes_por_agenda[j].titulo);
  }

  abrirProgramacaoPorData(data){
    this.navCtrl.push(ProgramacaoPorDataPage, {
      data: data, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes_por_agenda,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes, estouNaAgenda: this.estouNaAgenda
    });
  }

  abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, estouNaAgenda: this.estouNaAgenda, 
        id_agenda: this.agenda_atual.idReferencia, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
      });
  }

  // abrirProgramacao(info){
  //     this.navCtrl.push(ProgramacaoCompletaPage, {
  //       programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
  //       programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
  //       palestrantes: this.palestrantes
  //     });
  // }

}