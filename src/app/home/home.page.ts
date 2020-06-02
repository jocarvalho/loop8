import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { HomeService } from '../home/home.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  num: any;
  embalagens: any[] = [];

  value:any;

  constructor(public navCtrl: NavController, 
              private barcodeScanner: BarcodeScanner, 
              private toast: Toast, 
              private home: HomeService,
              private alertController: AlertController) {}

  toBack(){
    this.navCtrl.back();
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
    this.toast.show("Produto não encontrado", '3000', 'center').subscribe(
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
}
