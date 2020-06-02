import {Endereco} from '../registro/endereco/endereco'

export class Registro {
    firstName : string
    lastName : string
    cpf : string
    thumbnail : string
    contato : Contato = new Contato();
    dadosBancarios : Conta[] = new Array<Conta>();
}
class Contato {
    endereco: Endereco = new Endereco()
    email : string[]
    telefone: string[]
    instagram: string[]
    facebook: string[]
}

class Conta {
    banco : string 
    agencia : string
    conta : string
    tipo : string
}