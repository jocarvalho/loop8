import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SaldoComponent} from '../saldo/saldo.component'
import {SaldoRoutingModule} from '../saldo/saldo-routing.module'
import {AutocompleteComponent} from '../saldo/autocomplete/autocomplete.component'


@NgModule({
  declarations: [SaldoComponent,AutocompleteComponent],
  imports: [
    CommonModule,
    SaldoRoutingModule
  ],

})
export class SaldoModule { }
