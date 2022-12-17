import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Shop } from '../shared/shop';
import { AbstractService } from './abstract.service';
@Injectable({
  providedIn: 'root',
})
export class ShopService extends AbstractService {
  // Base url

  constructor(private http: HttpClient) {
    super();
  }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // POST
  CreateShop(data: any): Observable<Shop> {
    return this.http
      .post<Shop>(
        this.baseurl + '/shops',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // GET
  GetShop(id: string): Observable<Shop> {
    return this.http.get<Shop>(this.baseurl + '/shops/' + id).pipe(
      map((shop) => {
        shop.creationDate = new Date(shop.creationDate);
        return shop;
      }),
      retry(1),
      catchError(this.errorHandler)
    );
  }
  // GET
  GetShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.baseurl + '/shops').pipe(
      map((data) => {
        data.map((shop) => {
          // nécessaire pour avoir une propriété de type Date au lieu de string
          shop.creationDate = new Date(shop.creationDate);
        });
        return data;
      }),
      retry(1),
      catchError(this.errorHandler)
    );
  }
  // PATCH
  UpdateShop(id: string, data: any): Observable<Shop> {
    return this.http
      .patch<Shop>(
        this.baseurl + '/shops/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // DELETE
  DeleteShop(id: number) {
    return this.http
      .delete<Shop>(this.baseurl + '/shops/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }
}
