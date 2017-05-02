import { PalestranteProvider } from './../../providers/palestrante-provider';
import { PalestranteProgramacaoProvider } from './../../providers/palestrante-programacao-provider';
import { PalestranteProgramacao } from './../../model/palestrante-programacao';
import { ProgramacaoAgenda } from './../../model/programacao-agenda';
import { ProgramacaoAgendaProvider } from './../../providers/programacao-agenda-provider';
import { Agenda } from './../../model/agenda';
import { Palestrante } from './../../model/palestrante';
import { AgendaProvider } from './../../providers/agenda-provider';
import { UsuarioProvider } from './../../providers/usuario-provider';
import { Usuario } from './../../model/usuario';
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

  programacao_cientifica:Array<Programacao>;
  programacao_social:Array<Programacao>;
  programacao_comissoes:Array<Programacao>;
  programacao_por_data = [];

  usuarios:Array<Usuario>;
  agendas:Array<Agenda>;
  programacoes:Array<Programacao>;
  programacoes_agenda:Array<ProgramacaoAgenda>;

  //Vetor responsável por receber os dados da tabela palestrante-programacao
  palestrates_programacoes: Array<PalestranteProgramacao>;
    
  //Vetor responsável por receber os dados da tabela 'palestrantes'
  palestrantes: Array<Palestrante>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public programacaoProvider: ProgramacaoProvider, public ngZone: NgZone,
              public usuarioProvider: UsuarioProvider, public agendaProvider: AgendaProvider,
              public programacao_agendaProvider: ProgramacaoAgendaProvider, 
              public palestranteProgramacaoProvider: PalestranteProgramacaoProvider,
              public palestranteProvider: PalestranteProvider) {

                 this.programacao_cientifica = new Array<Programacao>();
                 this.programacao_social = new Array<Programacao>();
                 this.programacao_comissoes = new Array<Programacao>();

                 this.usuarios = new Array<Usuario>();
                 this.agendas = new Array<Agenda>();
                 this.programacoes = new Array<Programacao>();
                 this.programacoes_agenda = new Array<ProgramacaoAgenda>();

                 this.palestrates_programacoes = new Array<PalestranteProgramacao>();
                 this.palestrantes = new Array<Palestrante>();
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
        programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
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
 
  programacao_cientifica:Array<Programacao>;
  programacao_social:Array<Programacao>;
  programacao_comissoes:Array<Programacao>;
  programacao_por_data = [];

  usuarios:Array<Usuario>;
  agendas:Array<Agenda>;
  programacoes:Array<Programacao>;
  programacoes_agenda:Array<ProgramacaoAgenda>;

 //Vetor responsável por receber os dados da tabela palestrante-programacao
  palestrates_programacoes: Array<PalestranteProgramacao>;

  //Vetor responsável por receber os dados da tabela 'palestrantes'
  palestrantes: Array<Palestrante>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public programacaoProvider: ProgramacaoProvider, public ngZone: NgZone,
              public usuarioProvider: UsuarioProvider, public agendaProvider: AgendaProvider,
              public programacao_agendaProvider: ProgramacaoAgendaProvider, 
              public palestranteProgramacaoProvider: PalestranteProgramacaoProvider,
              public palestranteProvider: PalestranteProvider) {

                 this.programacao_cientifica = new Array<Programacao>();
                 this.programacao_social = new Array<Programacao>();
                 this.programacao_comissoes = new Array<Programacao>();

                 this.usuarios = new Array<Usuario>();
                 this.agendas = new Array<Agenda>();
                 this.programacoes = new Array<Programacao>();
                 this.programacoes_agenda = new Array<ProgramacaoAgenda>();

                 this.palestrates_programacoes = new Array<PalestranteProgramacao>();
                 this.palestrantes = new Array<Palestrante>();
              }

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

    let aux = new Array();
    for(let i = 0; i < this.programacoes.length; i++)
      if(this.programacoes[i].tipo == "Social")
        aux.push(this.programacoes[i]);

    this.programacao_social = aux;
  }

  abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
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

  programacao_cientifica:Array<Programacao>;
  programacao_social:Array<Programacao>;
  programacao_comissoes:Array<Programacao>;
  programacao_por_data = [];

  usuarios:Array<Usuario>;
  agendas:Array<Agenda>;
  programacoes:Array<Programacao>;
  programacoes_agenda:Array<ProgramacaoAgenda>;

 //Vetor responsável por receber os dados da tabela palestrante-programacao
  palestrates_programacoes: Array<PalestranteProgramacao>;
  
  //Vetor responsável por receber os dados da tabela 'palestrantes'
  palestrantes: Array<Palestrante>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public programacaoProvider: ProgramacaoProvider, public ngZone: NgZone,
              public usuarioProvider: UsuarioProvider, public agendaProvider: AgendaProvider,
              public programacao_agendaProvider: ProgramacaoAgendaProvider, 
              public palestranteProgramacaoProvider: PalestranteProgramacaoProvider,
              public palestranteProvider: PalestranteProvider) {

                 this.programacao_cientifica = new Array<Programacao>();
                 this.programacao_social = new Array<Programacao>();
                 this.programacao_comissoes = new Array<Programacao>();

                 this.usuarios = new Array<Usuario>();
                 this.agendas = new Array<Agenda>();
                 this.programacoes = new Array<Programacao>();
                 this.programacoes_agenda = new Array<ProgramacaoAgenda>();

                 this.palestrates_programacoes = new Array<PalestranteProgramacao>();
                 this.palestrantes = new Array<Palestrante>();
              }


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

    let aux = new Array();
    for(let i = 0; i < this.programacoes.length; i++)
      if(this.programacoes[i].tipo == "Comissões")
        aux.push(this.programacoes[i]);

    this.programacao_comissoes = aux;
  }

  abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
      });
  }

}
