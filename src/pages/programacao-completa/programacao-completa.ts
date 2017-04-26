import { AgendaPage } from './../agenda/agenda';
import { HomePage } from './../home/home';
import { ProgramacaoProvider } from './../../providers/programacao-provider';
import { UsuarioProvider } from './../../providers/usuario-provider';
import { Usuario } from './../../model/usuario';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public agendaProvider: AgendaProvider, public programacao_agendaProvider: ProgramacaoAgendaProvider,
              public ngZone: NgZone, public usuarioProvider: UsuarioProvider,
              public alertCtrl: AlertController, public programacaoProvider: ProgramacaoProvider) {
              this.programacao = navParams.get('programacao'); 
              this.usuarios = navParams.get('usuarios');
              this.agendas = navParams.get('agendas');
              this.programacoes_agenda = navParams.get('programacoes_agenda');
              this.programacoes = navParams.get('programacoes');

              this.programacao_agenda = new ProgramacaoAgenda();

              this.programacoes_por_agenda = new Array<Programacao>();
              this.programacao_agenda_por_usuario = new Array<ProgramacaoAgenda>();
  }

  ionViewDidLoad() {

      console.log("tamanho programacoes_agenda2: "+this.programacoes_agenda.length);
      console.log("Minhas programacoes na minha agenda: ");
      for(let j = 0; j < this.programacoes_agenda.length; j++) 
      {
        console.log("Indice: "+ j + " "+ this.programacoes_agenda[j].id_programacao);
      }

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
        {
          console.log("entrou1");
          this.programacao_agenda_por_usuario.push(this.programacoes_agenda[i]);
        }

      //Retornando todas as programacoes da minha agenda
      for(let i = 0; i < this.programacoes.length; i++)
        for(let j = 0; j < this.programacao_agenda_por_usuario.length; j++) 
          if(this.programacoes[i].idReferencia == this.programacao_agenda_por_usuario[j].id_programacao)
          {
            console.log("entrou");
            this.programacoes_por_agenda.push(this.programacoes[i]);
          }


  }

  addParaAgenda(){

      console.log("Minhas programacoes: ");
      for(let j = 0; j < this.programacoes_por_agenda.length; j++) 
        console.log(this.programacoes_por_agenda[j].titulo);

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
      console.log("Minha atual agenda: " + this.agenda_atual.email_usuario);

      let programacao_ja_existe: boolean;
      programacao_ja_existe = false;
      for(let i = 0; i < this.programacoes_por_agenda.length; i++)
      {
        if(this.programacoes_por_agenda[i].idReferencia == this.programacao.idReferencia)
        {   
            console.log("ENTROU");
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

}
