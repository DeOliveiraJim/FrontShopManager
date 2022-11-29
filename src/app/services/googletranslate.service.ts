import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleObj } from '../shared/google-obj';

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {

  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  key = 'AIzaSyD7v7b5_63fEwhU20B8GkOAo5ELk27BWA4';
  constructor(private http: HttpClient) { }
  translate(obj: GoogleObj) {
    return this.http.post(this.url + this.key, obj);
  }
}
