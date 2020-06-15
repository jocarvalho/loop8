import { Injectable } from '@angular/core';
import {Produto} from './produto';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

   produto:string = "https://loop8.herokuapp.com/produto";
   produtoTest:string = "http://localhost:3000/produto";
   ecobagRest:string ="http://localhost:3000/ecobag";
   ecobagRestTest:string ="https://loop8.herokuapp.com/ecobag";
   produtoUrl:string = this.produto;

  constructor(private http: HttpClient, private storage:Storage) { }
  
  
  getProduto(id: string): Observable<Produto> {
    const url = `${this.produtoUrl}/${id}`;
    return this.http.get<Produto>(url).pipe(
      tap(),
      catchError(this.handleError<Produto>(`produto id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(msg:string){
    console.log(msg);
  }
  chamarColetor(items:any, ecobag:any){
    const user = items.user;
    items.user = undefined;
    return this.http.post(this.ecobagRest,{user:user, produtos:items, ecobag:ecobag, status:"fechado"}).pipe(
      tap(),
      catchError(this.handleError<any>(`produto id=${ecobag}`))
    );
    
  }
}
