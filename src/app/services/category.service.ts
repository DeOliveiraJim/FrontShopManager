import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../shared/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
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
  CreateCategory(data: any): Observable<Category> {
    return this.http
      .post<Category>(
        this.baseurl + '/categories',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // GET
  GetCategory(id: string): Observable<Category> {
    return this.http
      .get<Category>(this.baseurl + '/categories/' + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // GET
  GetCategorys(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.baseurl + '/categories')
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // PATCH
  UpdateCategory(id: string, data: any): Observable<Category> {
    return this.http
      .patch<Category>(
        this.baseurl + '/categories/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // DELETE
  DeleteCategory(id: number) {
    return this.http
      .delete<Category>(this.baseurl + '/categories/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // Error handling
  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
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
