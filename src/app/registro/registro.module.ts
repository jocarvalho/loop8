import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistroComponent} from '../registro/registro.component'
import {RegistroRoutingModule} from '../registro/registro-routing.module'
import { EnderecoComponent } from './endereco/endereco.component';
import {ImageupComponent} from './imageup/imageup.component'
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [RegistroComponent, EnderecoComponent, ImageupComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    BrMaskerModule,
    IonicModule
  ],

})
export class RegistroModule { }
