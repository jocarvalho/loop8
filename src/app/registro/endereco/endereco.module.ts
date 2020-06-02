import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Endereco } from './endereco';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { EnderecoRoutingModule } from './endereco.routing.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoRoutingModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  declarations: [Endereco]
})
export class EnderecoModule {}
