import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boutique } from './shared/boutique';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

   // Base url
   baseurl = 'http://localhost:8080';
   constructor(private http: HttpClient) {}
   // Http Headers
   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
   };
   // POST
   CreateBoutique(data: any): Observable<Boutique> {
     return this.http
       .post<Boutique>(
         this.baseurl + '/boutique',
         JSON.stringify(data),
         this.httpOptions
       )
       .pipe(retry(1), catchError(this.errorHandl));
   }
   // GET
   GetBoutique(id: string): Observable<Boutique> {
     return this.http
       .get<Boutique>(this.baseurl + '/boutique/' + id)
       .pipe(retry(1), catchError(this.errorHandl));
   }
   // GET
   GetBoutiques(): Observable<Boutique> {
     return this.http
       .get<Boutique>(this.baseurl + '/boutique')
       .pipe(retry(1), catchError(this.errorHandl));
   }
   // PATCH
   UpdateBoutique(id: string, data: any): Observable<Boutique> {
     return this.http
       .patch<Boutique>(
         this.baseurl + '/boutique/' + id,
         JSON.stringify(data),
         this.httpOptions
       )
       .pipe(retry(1), catchError(this.errorHandl));
   }
   // DELETE
   DeleteBoutique(id: string) {
     return this.http
       .delete<Boutique>(this.baseurl + '/boutique/' + id, this.httpOptions)
       .pipe(retry(1), catchError(this.errorHandl));
   }
   // Error handling
   errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
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
