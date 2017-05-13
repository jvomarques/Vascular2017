import { Push } from './../../model/push';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pagina-notificacoes',
  templateUrl: 'pagina-notificacoes.html'
})
export class PaginaNotificacoesPage {

  data:any;

  itens:any;
  item:any;

  push:Push;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.data = navParams.get('data');
      this.push = new Push();

      
      //this.itens=JSON.parse(this.data);
      // this.itens = 
      // [
      //   {"name":"Moby Dick","position":"Big ass whale"}
      // ];

  // this.item = JSON.parse(this.itens);
  }

  ionViewDidLoad() {

      this.push = JSON.parse(JSON.stringify(this.data));

  }

}
