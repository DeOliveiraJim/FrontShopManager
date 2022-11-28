import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Category {
  id!: number;
  name!: string;
}
