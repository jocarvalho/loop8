import { Component, AfterViewInit} from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss'],
})
export class SaldoComponent implements AfterViewInit{

  motivacional : string=''
  constructor(private storage:Storage) { }

  obterMensagemMotivacional() {
     this.storage.get('saldo.motivacional').then((val)=>{
     this.motivacional=val;
  }) 
  
}
  ngAfterViewInit(){
    this.storage.set('saldo.motivacional','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    this.obterMensagemMotivacional();
  }
/*
resultsAvailable: boolean = false;
results: string[] = [];
ignoreNextChange: boolean = false;

onSearchChange(event: any) {
    const substring = event.target.value;
    if (this.ignoreNextChange) {
        this.ignoreNextChange = false;
        return;
    }

    this.dataService.getStrings(substring).subscribe((result) => {
        this.results = result;
        if (this.results.length > 0) {
            this.resultsAvailable = true;               
        } else {
            this.resultsAvailable = false;
        }
    });
}

supplierSelected(selected: string) :void {
    this.supplier = selected;
    this.results = [];
    this.resultsAvailable = false;
    this.ignoreNextChange = true;
}*/
}
