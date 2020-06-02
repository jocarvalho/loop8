import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  constructor(private service:LoginService, private router : Router,
    private storage:Storage) { }

  fazerLogin(){
    this.service.fazerLogin(this.email, this.password, (result)=>{
      console.log(`${this.email}, ${this.password}`)
        if(result.user.id)
          this.router.navigateByUrl('/saldo');
        else
          console.log('User or pass invalid');
          //this.router.navigateByUrl('/registro');
    });
  }

  ngOnInit() {
    this.storage.get('login.user').then((user)=>{
      if(user){
        this.router.navigateByUrl('/saldo');
      }
    });
    
  }

}
