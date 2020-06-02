import { Injectable } from '@angular/core';
import {Produto} from './produto';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
   sourceProd:string = "https://loop8.herokuapp.com/produto";
   sourceTest:string = "http://localhost:3000/produto"

  produtoUrl:string = this.sourceProd;
  constructor(private http: HttpClient) { }
  
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
}
