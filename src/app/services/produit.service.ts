import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Produit } from '../shared/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

     // Base url
     baseurl = environment.baseurl;
     constructor(private http: HttpClient) {}
     // Http Headers
     httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
       }),
     };

  // GET
  GetProduits(idBoutique: string): Observable<Produit> {
    return this.http
      .get<Produit>(this.baseurl + '/boutique/' + idBoutique + '/produits')
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET
  GetProduit(idBoutique: string, idProduit : string): Observable<Produit> {
      return this.http
        .get<Produit>(this.baseurl + '/boutique/' + idBoutique + '/produits/' + idProduit)
        .pipe(retry(1), catchError(this.errorHandler));
  }

  //PATCH
  UpdateProduit(idBoutique: string,idProduit : string, data: any): Observable<Produit> {
    return this.http
      .patch<Produit>(
        this.baseurl + '/boutique/' + idBoutique + '/produits/' + idProduit,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // DELETE
  DeleteBoutique(idBoutique: string,idProduit : string) {
      return this.http
        .delete<Produit>(this.baseurl + '/boutique/' + idBoutique + '/produits/' + idProduit,
         this.httpOptions)
        .pipe(retry(1), catchError(this.errorHandler));
  }

   // Error handling
   errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }



  }



