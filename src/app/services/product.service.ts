import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

     // Base url
     baseurl = environment.baseurl;
     constructor(private http: HttpClient) {}
     // Http Headers
     httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
       }),
     };

  //POST
  CreateProduct(idShop: string,data: any): Observable<product> {
    return this.http
      .post<product>(
        this.baseurl + '/shops/' + idShop + '/products/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }



  // GET
  GetProducts(idShop: string): Observable<product> {
    return this.http
      .get<product>(this.baseurl + '/shops/' + idShop + '/products')
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET
  GetProduct(idShop: string, idProduct : string): Observable<product> {
      return this.http
        .get<product>(this.baseurl + '/shops/' + idShop + '/products/' + idProduct)
        .pipe(retry(1), catchError(this.errorHandler));
  }

  //PATCH
  UpdateProduct(idShop: string,idProduct : string, data: any): Observable<product> {
    return this.http
      .patch<product>(
        this.baseurl + '/shops/' + idShop + '/products/' + idProduct,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // DELETE
  DeleteShop(idShop: string,idProduct : string) {
      return this.http
        .delete<product>(this.baseurl + '/shops/' + idShop + '/products/' + idProduct,
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



