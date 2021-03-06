import { ProgramacaoPorDataPage } from './../pages/programacao-por-data/programacao-por-data';
import { PaginaNotificacoesPage } from './../pages/pagina-notificacoes/pagina-notificacoes';
import { PalestranteDescricaoWithNavBarPage } from './../pages/palestrante-descricao-with-nav-bar/palestrante-descricao-with-nav-bar';
import { SobreAppPage } from './../pages/sobre-app/sobre-app';
import { SobrePage } from './../pages/sobre/sobre';
import { ProgramacaoCompletaWithNavBarPage } from './../pages/programacao-completa-with-nav-bar/programacao-completa-with-nav-bar';
import { PalestranteProgramacaoProvider } from './../providers/palestrante-programacao-provider';
import { AconteceAgoraProvider } from './../providers/acontece-agora-provider';
import { AconteceAgoraDescricaoPage } from './../pages/acontece-agora-descricao/acontece-agora-descricao';
import { AconteceAgoraPage } from './../pages/acontece-agora/acontece-agora';
import { FeiraProvider } from './../providers/feira-provider';
import { FeiraDescricaoPage } from './../pages/feira-descricao/feira-descricao';
import { FeiraPage } from './../pages/feira/feira';
import { TurismoDescricaoPage } from './../pages/turismo-descricao/turismo-descricao';
import { TurismoProvider } from './../providers/turismo-provider';
import { TurismoPage } from './../pages/turismo/turismo';
import { AgendaComissoesPage } from './../pages/agenda-comissoes/agenda-comissoes';
import { AgendaSocialPage } from './../pages/agenda-social/agenda-social';
import { AgendaCientificaPage } from './../pages/agenda-cientifica/agenda-cientifica';
import { ProgramacaoAgendaProvider } from './../providers/programacao-agenda-provider';
import { AgendaProvider } from './../providers/agenda-provider';
import { AgendaPage } from './../pages/agenda/agenda';
import { ProgramacaoCompletaPage } from './../pages/programacao-completa/programacao-completa';
import { ProgramacaoListaPage } from './../pages/programacao-lista/programacao-lista';
import { ProgramacaoTabsPage1, ProgramacaoTabsPage2, ProgramacaoTabsPage3 } from './../components/programacao-tabs/programacao-tabs';
import { ProgramacaoProvider } from './../providers/programacao-provider';
import { PalestranteDescricaoPage } from './../pages/palestrante-descricao/palestrante-descricao';
import { PalestranteProvider } from './../providers/palestrante-provider';
import { PalestrantesListaPage } from './../pages/palestrantes-lista/palestrantes-lista';
import { PopoverPage } from './../pages/home/home';
import { UsuarioEditarPage } from './../pages/usuario-editar/usuario-editar';
import { UsuarioProvider } from './../providers/usuario-provider';
import { PerfilUsuarioPage } from './../pages/perfil-usuario/perfil-usuario';
import { InformacaoCompletaPage } from './../pages/informacao-completa/informacao-completa';
import { NgModule, ErrorHandler, ViewChild } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Platform, NavController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { InfomacoesListaPage } from '../pages/infogerais/infogerais';
import {InformacaoAddPage} from '../pages/informacao-add/informacao-add';

import {LoginProvider} from "../providers/loginprovider";
import {InformacaoProvider} from "../providers/informacao-provider";
import {ListProvider} from "../providers/list-provider";

import {InformacaoItemComponent} from '../components/informacao-item/informacao-item';

/*Importando firebase*/
import firebase from "firebase";

import {OneSignal} from '@ionic-native/onesignal';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { InAppBrowser} from 'ionic-native';

/*Importando configurações do projeto firebase*/
// const firebaseConfig = {
//   apiKey: "AIzaSyDPwwJcjnGmLZpLA3d17dpl1xYFLrOGH2E",
//   authDomain: "event-b66ef.firebaseapp.com",
//   databaseURL: "https://event-b66ef.firebaseio.com",
//   storageBucket: "event-b66ef.appspot.com",
//   messagingSenderId: "757000610628"
// };

let firebaseConfig = {
    apiKey: "AIzaSyBSi2osj5XPOI4KsGTa13sKfgr6OkEWQBo",
    authDomain: "vascular-2017.firebaseapp.com",
    databaseURL: "https://vascular-2017.firebaseio.com",
    projectId: "vascular-2017",
    storageBucket: "vascular-2017.appspot.com",
    messagingSenderId: "536954348713"
  };



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    InfomacoesListaPage,
    InformacaoItemComponent,
    InformacaoAddPage,
    InformacaoCompletaPage,
    PerfilUsuarioPage,
    UsuarioEditarPage,
    PopoverPage,
    PalestrantesListaPage,
    PalestranteDescricaoPage,
    ProgramacaoListaPage,
    ProgramacaoTabsPage1,
    ProgramacaoTabsPage2,
    ProgramacaoTabsPage3,
    ProgramacaoCompletaPage,
    AgendaPage,
    AgendaCientificaPage,
    AgendaSocialPage,
    AgendaComissoesPage,
    TurismoPage,
    TurismoDescricaoPage,
    FeiraPage,
    FeiraDescricaoPage,
    AconteceAgoraPage,
    AconteceAgoraDescricaoPage,
    ProgramacaoCompletaWithNavBarPage,
    SobrePage,
    SobreAppPage,
    PalestranteDescricaoWithNavBarPage,
    PaginaNotificacoesPage,
    ProgramacaoPorDataPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsPlacemant:"top"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    InfomacoesListaPage,
    InformacaoItemComponent,
    InformacaoAddPage,
    InformacaoCompletaPage,
    PerfilUsuarioPage,
    UsuarioEditarPage,
    PopoverPage,
    PalestrantesListaPage,
    PalestranteDescricaoPage,
    ProgramacaoListaPage,
    ProgramacaoTabsPage1,
    ProgramacaoTabsPage2,
    ProgramacaoTabsPage3,
    ProgramacaoCompletaPage,
    AgendaPage,
    AgendaCientificaPage,
    AgendaSocialPage,
    AgendaComissoesPage,
    TurismoPage,
    TurismoDescricaoPage,
    FeiraPage,
    FeiraDescricaoPage,
    AconteceAgoraPage,
    AconteceAgoraDescricaoPage,
    ProgramacaoCompletaWithNavBarPage,
    SobrePage,
    SobreAppPage,
    PalestranteDescricaoWithNavBarPage,
    PaginaNotificacoesPage,
    ProgramacaoPorDataPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    InformacaoProvider,
    ListProvider,
    UsuarioProvider,
    PalestranteProvider,
    ProgramacaoProvider,
    AgendaProvider,
    ProgramacaoAgendaProvider,
    OneSignal,
    TurismoProvider,
    FeiraProvider,
    AconteceAgoraProvider,
    PalestranteProgramacaoProvider,
    // InAppBrowser
  ]
})
export class AppModule {

  @ViewChild(NavController) nav: NavController;
  rootPage:any;

  constructor(private _OneSignal: OneSignal, private _platform: Platform,
              ) {

    /*Inicializando firebase no construtor do meu AppModule*/
    firebase.initializeApp(firebaseConfig);
    this.initializeApp();
    
  }
    
    initializeApp() {
    this._platform.ready().then(() => {
      // this._OneSignal.startInit("24bc7f28-86ab-4ecb-9f5c-fa0064f4e09b", "536954348713");
      // this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
      // this._OneSignal.setSubscription(true);
      // this._OneSignal.handleNotificationReceived().subscribe(() => {
      //   // handle received here how you wish.
      // });
      // this._OneSignal.handleNotificationOpened().subscribe(data => {
      //   this.nav.push(PaginaNotificacoesPage, {data: data});
      // });
      // this._OneSignal.endInit();        
    })    
  }
}
