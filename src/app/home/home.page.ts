import { Component, Input, AfterViewInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController, ModalController} from '@ionic/angular';

import { Toast } from '@ionic-native/toast/ngx';
import { HomeService } from '../home/home.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
//import {FecharEcoBag} from '../home/'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{
  
  num: any;
  embalagens: any[] = [];
  value:any;
  user: any;
  constructor(public navCtrl: NavController, 
              private barcodeScanner: BarcodeScanner, 
              private toast: Toast, 
              private home: HomeService,
              private alertController: AlertController,
              public modal:ModalController,
              private storage:Storage
              ) {}

  toBack(){
    this.navCtrl.back();
  }
  ngAfterViewInit(){
    this.storage.get('login.user').then(u=>{
      this.user=u.user;
    })
  }
addBarcode(){
    if(this.num!=='')
    this.home.getProduto(this.num)
      .subscribe(produto =>{
        console.log(`onSubscribe: ${this.num}, ${produto.gtin}`);
        this.tratarRetorno(produto);
        this.num = '';
        this.value='';
      });
      else
        {
          this.presentAlert({header:"Campo vazio",subHeader:"",msg:"Prencha o campo com o código de barras."});
        }
  }
  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msg.header,
      subHeader: msg.subHeader,
      message: msg.msg,
      buttons: ['OK']
    });

    await alert.present();
  }

scan() {
  this.barcodeScanner.scan().then(data => {
    this.home.getProduto(data.text)
    .subscribe(produto =>{
      console.log(`onscan:${produto}`)
     this.tratarRetorno(produto); 
    });
  });   
}

tratarRetorno(produto){
  console.log(`produtotratarRetorno:${JSON.stringify(produto)}`)
  if(produto.description){
    console.log("item to search:"+produto.value);
    const item = this.getProdutoByCode(produto.gtin);
    console.log("Item encontrado:"+JSON.stringify(item))
    if(item.length>0){
      this.embalagens[this.embalagens.indexOf(item[0])].qtdd++;
    }else{
      if(produto.brand===undefined){
        if(produto.ncm===undefined)
          produto.brand={name:"" };
        else
        produto.brand={name:produto.ncm.description}
      }
      produto.qtdd = 1;
      this.embalagens.push(produto);
    }
  }else{
    this.toast.show("Produto não encontrado", '3000', 'center')
    .subscribe(
      toast => {console.log(toast);}
      );
  }
}

getProdutoByCode(code:number) {
  return this.embalagens.filter(
      function(data){ return data.gtin == code }
  );
}

testAdd(produto:any){
  this.embalagens[this.embalagens.indexOf(this.getProdutoByCode(produto[0])[0])].qtdd=Number(produto[1]);
  
}
apagarItem(item){
  this.embalagens.splice(this.embalagens.indexOf(item), 1);
}
limparItens(){
  this.embalagens = [];
}
adicionarEcobag(){
  
}

async chamarColetor() {
    
    const profileModal = await this.modal.create({
      component: FecharEcoBag,
      
      componentProps: {
        'user': this.user,
        'items': this.embalagens
      }
      
    });
    return await profileModal.present();
  }
}


@Component({
  selector: 'fechar-eco-bag',
  templateUrl:"fechar-ecobag.html"
})
export class FecharEcoBag {
  @Input() user: any="";
  @Input() items: any[];
  codigoEcobag : string;
  constructor(private home: HomeService, private modalCtrl:ModalController) {}

  chamarColetor(){
    console.log(this.codigoEcobag)
    const itemsRest =[];
    this.items.forEach(i=>{
      itemsRest.push({gtin:i.gtin, qtdd:i.qtdd});
    })
    this.home.chamarColetor({produtos:itemsRest, user:this.user}, this.codigoEcobag)
      .subscribe(ret => {
        console.log(ret);
      });
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'data':`somevalue`
    });
  }
  apagarItem(item){
    this.items.splice(this.items.indexOf(item), 1);
  }
  testAdd(produto:any){
    this.items[this.items.indexOf(this.getProdutoByCode(produto[0])[0])].qtdd=Number(produto[1]);
    
  }
  getProdutoByCode(code:number) {
    return this.items.filter(
        function(data){ return data.gtin == code }
    );
  }
}