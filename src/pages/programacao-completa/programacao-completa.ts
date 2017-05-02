import { PalestranteDescricaoPage } from './../palestrante-descricao/palestrante-descricao';
import { PalestranteProgramacao } from './../../model/palestrante-programacao';
import { AgendaPage } from './../agenda/agenda';
import { HomePage } from './../home/home';
import { ProgramacaoProvider } from './../../providers/programacao-provider';
import { UsuarioProvider } from './../../providers/usuario-provider';
import { Usuario } from './../../model/usuario';
import { Palestrante } from './../../model/palestrante';
import { ProgramacaoAgendaProvider } from './../../providers/programacao-agenda-provider';
import { AgendaProvider } from './../../providers/agenda-provider';
import { Agenda } from './../../model/agenda';
import { ProgramacaoAgenda } from './../../model/programacao-agenda';
import { Programacao } from './../../model/programacao';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-programacao-completa',
  templateUrl: 'programacao-completa.html'
})
export class ProgramacaoCompletaPage {

  programacao: Programacao;
  usuarios_teste: Array<Usuario>;


  programacoes:Array<Programacao>;
  programacoes_por_agenda:Array<Programacao>;
  
  agendas:Array<Agenda>;
  agenda_atual: Agenda;

  usuarios:Array<Usuario>;
  usuario_email_atual = firebase.auth().currentUser.email;
  usuario_atual:Usuario;

  programacoes_agenda:Array<ProgramacaoAgenda>;
  programacao_agenda_por_usuario:Array<ProgramacaoAgenda>;
  programacao_agenda: ProgramacaoAgenda;

  //USADO PARA DIFERENCIAR O BOTÃO DE ADICIONAR OU REMOVER PROGRAMACAO
  estouNaAgenda:boolean;
  textoBotaoAdd_Delete:string;

   //Vetor responsável por receber os dados da tabela palestrante-programacao
  palestrates_programacoes: Array<PalestranteProgramacao>;
  palestrates_programacoes_atual: Array<PalestranteProgramacao>;

  id_palestrantes: Array<string>;
  palestrantes: Array<Palestrante>;
  palestrantes_atuais: Array<Palestrante>;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              public agendaProvider: AgendaProvider, public programacao_agendaProvider: ProgramacaoAgendaProvider,
              public ngZone: NgZone, public usuarioProvider: UsuarioProvider,
              public alertCtrl: AlertController, public programacaoProvider: ProgramacaoProvider) {
              this.programacao = navParams.get('programacao'); 
              this.usuarios = navParams.get('usuarios');
              this.agendas = navParams.get('agendas');
              this.programacoes_agenda = navParams.get('programacoes_agenda');
              this.programacoes = navParams.get('programacoes');
              this.estouNaAgenda = navParams.get('estouNaAgenda');
              this.palestrates_programacoes = navParams.get('palestrates_programacoes');
              this.palestrantes = navParams.get('palestrantes')

              this.programacao_agenda = new ProgramacaoAgenda();

              this.programacoes_por_agenda = new Array<Programacao>();
              this.programacao_agenda_por_usuario = new Array<ProgramacaoAgenda>();

              this.palestrates_programacoes_atual = new Array<PalestranteProgramacao>();

              this.id_palestrantes = new Array<string>();
              this.palestrantes_atuais = new Array<Palestrante>();
  }

  ionViewDidLoad() {

      if(this.estouNaAgenda)
          this.textoBotaoAdd_Delete = "Remover da minha agenda";
      else
          this.textoBotaoAdd_Delete = "Adicionar à minha agenda";

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
        

      //Retornando todas as programacoes da minha agenda para não permitir adicionar programações repetidas
      for(let i = 0; i < this.programacoes.length; i++)
        for(let j = 0; j < this.programacao_agenda_por_usuario.length; j++) 
          if(this.programacoes[i].idReferencia == this.programacao_agenda_por_usuario[j].id_programacao)
            this.programacoes_por_agenda.push(this.programacoes[i]);


      /*FLUXO PARA LISTAGEM DE PALESTRANTES POR PROGRAMACAO
        1) LISTAR TODAS OS PALESTRANTES

        2) PEGAR MINHA PROGRAMAÇÃO ATUAL

        3) LISTAR TODOS OS DADOS DA TABELA PALESTRANTE_PROGRAMACAO

        4) PEGAR TODOS OS ID DE PALESTRANTES DE ACORDO COM MINHA PROGRAMAÇÃO ATUAL

        5) PEGAR LISTA DE TODOS OS PALESTRANTES DE ACORDO COM OS ID'S ENCONTRADOS EM (4)
      */

        //Pegando os valores da tabela auxiliar 'Palestrante-Programacao' de acordo com a programação atual
        for(let i = 0; i < this.palestrates_programacoes.length; i++)
            if(this.palestrates_programacoes[i].id_programacao == this.programacao.idReferencia)
                this.palestrates_programacoes_atual.push(this.palestrates_programacoes[i]);

        //Pegando o ID de todas os palestrantes de acordo com a tabela auxiliar 'palestrante-programacao'
        for(let i = 0; i < this.palestrates_programacoes_atual.length; i++)
            this.id_palestrantes.push(this.palestrates_programacoes_atual[i].id_palestrante);

        for(let i = 0; i < this.id_palestrantes.length; i++)
        {
            for(let j = 0; j < this.palestrantes.length; j++)
            {
              if(this.id_palestrantes[i] == this.palestrantes[j].idReferencia)
              {
                this.palestrantes_atuais.push(this.palestrantes[j]);
                break;
              }
            }
        }

  }

    abrirPalestrante(palestrante){

      let palestrante_atual:Palestrante;

      for(let i = 0; i < this.palestrantes.length; i++)
        if(this.palestrantes[i].nome == palestrante.nome)
          palestrante_atual = this.palestrantes[i];

      this.navCtrl.push(PalestranteDescricaoPage, {
        param1: palestrante_atual, palestrantes: this.palestrantes, 
        palestrates_programacoes: this.palestrates_programacoes, programacoes: this.programacoes
      });
    
  }

  add_DeleteAgenda(){

    if(!this.estouNaAgenda)
    {
      //Pegando o usuario com email igual ao email da autenticação
      for(let i = 0; i < this.usuarios.length; i++)
        if(this.usuarios[i].email == this.usuario_email_atual){
          this.usuario_atual = this.usuarios[i];
          break;
        }
        //console.log("Usuario logado: " + this.usuario_atual.nome);
      
      //Pegando a agenda atual de acordo com o usuario logado
      for(let i = 0; i < this.agendas.length; i++){
        if(this.agendas[i].id_usuario == this.usuario_atual.idReferencia){
          this.agenda_atual = this.agendas[i];
          break;
        }
      }
      

      let programacao_ja_existe: boolean;
      programacao_ja_existe = false;
      for(let i = 0; i < this.programacoes_por_agenda.length; i++)
      {
        if(this.programacoes_por_agenda[i].idReferencia == this.programacao.idReferencia)
        {   
            let alert = this.alertCtrl.create({
            title: 'Agenda',
            subTitle: 'Programação já existe na agenda.',
            buttons: ['Ok']
            });
            alert.present();
            
            programacao_ja_existe = true;
            break;
        }
        programacao_ja_existe = false;
      }

      if(programacao_ja_existe == false)
      {
        //Criando ligacao entre programacao e agenda atraves da Classe/tabela ProgramacaoAgenda
        this.programacao_agenda.id_programacao = this.programacao.idReferencia;
        this.programacao_agenda.id_agenda = this.agenda_atual.idReferencia;
        
        this.programacao_agendaProvider.adicionarProgramacaoAgenda(this.programacao_agenda);

        let alert = this.alertCtrl.create({
          title: 'Agenda',
          subTitle: 'Programação adicionada à agenda com sucesso.',
          buttons: ['Ok']
        });
        alert.present();

        this.navCtrl.pop();
      }
    }
    else {

      for(let i = 0; i < this.programacoes_agenda.length; i++)
        if(this.programacoes_agenda[i].id_agenda == this.agenda_atual.idReferencia &&
          this.programacoes_agenda[i].id_programacao == this.programacao.idReferencia)
            this.programacao_agendaProvider.deletarProgramacaAgenda(this.programacoes_agenda[i]);

      let alert = this.alertCtrl.create({
          title: 'Agenda',
          subTitle: 'Programação removida da agenda com sucesso.',
          buttons: ['Ok']
        });
        alert.present();
      
    }



    }

}
