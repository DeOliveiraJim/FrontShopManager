import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../shared/shop';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

   // Base url
   baseurl = environment.baseurl;
   constructor(private http: HttpClient) {}
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
     return this.http
       .get<Shop>(this.baseurl + '/shops/' + id)
       .pipe(retry(1), catchError(this.errorHandler));
   }
   // GET
   GetShops(): Observable<Shop> {
     return this.http
       .get<Shop>(this.baseurl + '/shops')
       .pipe(retry(1), catchError(this.errorHandler));
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
   DeleteShop(id: string) {
     return this.http
       .delete<Shop>(this.baseurl + '/shops/' + id, this.httpOptions)
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
     console.log(errorMessage);
     return throwError(() => {
       return errorMessage;
     });
   }
}
