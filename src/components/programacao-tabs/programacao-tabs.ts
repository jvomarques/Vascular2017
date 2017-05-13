import { ProgramacaoPorDataPage } from './../../pages/programacao-por-data/programacao-por-data';
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
          <!-- <ion-list class="list-avatar-page" *ngFor="let programacao of programacoes">
        
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

      </ion-list> -->

      <ion-list  *ngIf="programacoes_data" [virtualScroll]="programacoes_data">
        <ion-item class="lista" ion-item *virtualItem="let programacao_data">
          <h2>{{programacao_data | date: 'dd/MM/yyyy'}}</h2>
          <button ion-button clear item-right (click)="abrirProgramacaoPorData(this.programacao_data)">Ver</button>
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

  //Vetor responsável por receber valores da datas de programacoes
  programacoes_data;

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

                 this.programacoes = navParams.get('programacoes');
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
    console.log("Tamanho do meu Array: " + this.programacoes.length);

    let programacoes_data_aux =[];
    
    for(let i = 0; i < this.programacoes.length; i++)
      programacoes_data_aux[i] = this.programacoes[i].data;
    
    this.programacoes_data = programacoes_data_aux.filter(function(este, i) {
        return programacoes_data_aux.indexOf(este) == i;
    })

    for(let i = 0; i < this.programacoes_data.length; i++)
      console.log(this.programacoes_data[i]);
  
  }

  abrirProgramacaoPorData(data){
    this.navCtrl.push(ProgramacaoPorDataPage, {
      data: data, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
    });
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
        <!--<ion-list class="list-avatar-page" *ngFor="let programacao of programacoes">
        
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

      </ion-list>-->

      <ion-list [virtualScroll]="programacoes_data">
        <ion-item class="lista" ion-item *virtualItem="let programacao_data">
          <h2>{{programacao_data | date: 'dd/MM/yyyy'}}</h2>
          <button ion-button clear item-right (click)="abrirProgramacaoPorData(this.programacao_data)">Ver</button>
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

  //Vetor responsável por receber valores da datas de programacoes
  programacoes_data;

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

                 this.programacoes = navParams.get('programacoes_sociais');
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

    let aux = new Array<Programacao>();
    for(let i = 0; i < this.programacoes.length; i++)
      if(this.programacoes[i].tipo == "Social")
        aux.push(this.programacoes[i]);

    this.programacao_social = aux;

    for(let i = 0; i < this.programacao_social.length; i++)
      console.log(this.programacao_social[i].titulo);

    /*AGRUPANDO POR DATAS*/ 
    console.log("Tamanho do meu Array Social: " + this.programacoes.length);

    let programacoes_data_aux =[];
    
    for(let i = 0; i < this.programacoes.length; i++)
      programacoes_data_aux[i] = this.programacao_social[i].data;
    
    this.programacoes_data = programacoes_data_aux.filter(function(este, i) {
        return programacoes_data_aux.indexOf(este) == i;
    })

    for(let i = 0; i < this.programacoes_data.length; i++)
      console.log(this.programacoes_data[i]);
  
  }

  abrirProgramacaoPorData(data){
    this.navCtrl.push(ProgramacaoPorDataPage, {
      data: data, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
    });
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

      <!-- <ion-list [virtualScroll]="programacoes_data">
        <ion-item class="lista" ion-item *virtualItem="let programacao_data">
          <h2>{{programacao_data | date: 'dd/MM/yyyy'}}</h2>
          <button ion-button clear item-right (click)="abrirProgramacaoPorData(this.programacao_data)">Ver</button>
        </ion-item>
      </ion-list> -->
    
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

  //Vetor responsável por receber valores da datas de programacoes
  programacoes_data;

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

                 this.programacoes = navParams.get('programacoes');
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

  abrirProgramacaoPorData(data){
    this.navCtrl.push(ProgramacaoPorDataPage, {
      data: data, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
    });
  }

  abrirProgramacao(info){
      this.navCtrl.push(ProgramacaoCompletaPage, {
        programacao: info, usuarios: this.usuarios, agendas: this.agendas, programacoes: this.programacoes,
        programacoes_agenda: this.programacoes_agenda, palestrates_programacoes: this.palestrates_programacoes,
        palestrantes: this.palestrantes
      });
  }

}
