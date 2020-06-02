import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EnderecoComponent } from './endereco/endereco.component';
import{Endereco} from './endereco/endereco';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements AfterViewInit{

  @ViewChild(EnderecoComponent) child:EnderecoComponent;
  endereco:Endereco; 
  nome:any
  email:string
  descricao:string
  telefone:string
  cpf:string
  constructor(
    private fb: FormBuilder
    ) { }

  loginFormMethod() {
    console.log("nome "+this.nome);
    console.log("email "+this.email);
    console.log("Telefone "+this.telefone);
    console.log("cpf "+this.cpf);
    console.log("endereco "+JSON.stringify(this.endereco));
    console.log("descricao "+this.descricao);

  }
  ngAfterViewInit(){
    this.endereco=this.child.endereco;
  }
}
