import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {SaldoComponent} from '../saldo/saldo.component'
import {SaldoRoutingModule} from '../saldo/saldo-routing.module'
//import {AutocompleteComponent} from '../saldo/autocomplete/autocomplete.component'


@NgModule({
  //declarations: [SaldoComponent,AutocompleteComponent],
  declarations: [SaldoComponent],
  imports: [
    CommonModule,
    SaldoRoutingModule,
    IonicModule
  ],

})
export class SaldoModule { }
