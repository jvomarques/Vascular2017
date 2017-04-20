import { Component, Input  } from '@angular/core';

import {Informacao} from '../../model/informacao';


@Component({
  selector: 'informacao-item',
  templateUrl: 'informacao-item.html'
})
export class InformacaoItemComponent {

  @Input()
  informacao:Informacao;

}
