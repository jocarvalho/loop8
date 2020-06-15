import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Login} from './login'
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private storage:Storage) { }
  private logged:boolean=false;
  showMenu():boolean{
    return this.logged;
  }
  fazerLogin(email:string, password:string, callback){
    this.storage.get('login.user').then((user)=>{
      if(user){
        console.log(`onUserOn:${JSON.stringify(user)}`)
        callback(undefined, user);
      }
      else{
        this.http.post<Login>('https://loop8.herokuapp.com/login',{'email':email,'password':password}).subscribe(
          (user)=>{
            this.storage.set('login.user',user);
            this.logged=true;
            callback(undefined,user);
          },
          err =>{callback(err,undefined)},
          ()=>{
            console.log("complete post /login");
          }
        );
      }
    });
  }
}
