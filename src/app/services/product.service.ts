import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/product';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //POST
  CreateProduct(idShop: string, data: any): Observable<Product> {
    return this.http
      .post<Product>(this.baseurl + '/shops/' + idShop + '/products/', JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET
  GetProducts(idShop: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseurl + '/shops/' + idShop + '/products')
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET
  GetProduct(idShop: string, idProduct: string): Observable<Product> {
    return this.http
      .get<Product>(this.baseurl + '/shops/' + idShop + '/products/' + idProduct)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  //PATCH
  UpdateProduct(idShop: string, idProduct: string, data: any): Observable<Product> {
    return this.http
      .patch<Product>(
        this.baseurl + '/shops/' + idShop + '/products/' + idProduct,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // DELETE
  DeleteShop(idShop: string, idProduct: string) {
    return this.http
      .delete<Product>(this.baseurl + '/shops/' + idShop + '/products/' + idProduct, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }
}
