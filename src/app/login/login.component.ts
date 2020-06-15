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
  loginFail:boolean=false;
  constructor(private service:LoginService, private router : Router,
    private storage:Storage) { }

  fazerLogin(){
    this.service.fazerLogin(this.email, this.password, (err, result)=>{
      
      if(err){
        this.loginFail=true;
        console.log('User or pass invalid');
      }else
       if(result.user.id)
          this.router.navigateByUrl('/saldo');    
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
