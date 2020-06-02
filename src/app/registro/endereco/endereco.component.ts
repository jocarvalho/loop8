import { Component} from '@angular/core';
import { RegistroService } from '../registro.service';
import {Endereco} from '../endereco/endereco';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent {

  endereco : Endereco = new Endereco();
  _codigo : any;
  constructor(private service : RegistroService) { }

  print(value:any){
    console.log(value);
    console.log(this.endereco)
  }
  preencherCamposPorCep(cep:string){
    this.service.consultaCep(cep).subscribe(
      resCep=>{
        console.log(resCep);
        this.endereco.cidade=resCep.localidade;
        this._codigo=resCep.cep;
        this.endereco.complemento=resCep.complemento;
        this.endereco.bairro=resCep.bairro;
        this.endereco.unidadeFederal=resCep.uf;
        this.endereco.logradouro=resCep.logradouro;
    },
    err=>{console.log("Erro ao consultar cep"+err);},
    ()=>{
      this.endereco.codigoPostal=this._codigo;
    });
  }
}
