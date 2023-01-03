import { Category } from './category';

export class Product {
  id!: string;
  details!: {
    lang: string;
    name: string;
    description: string;
  }[];
  price!: number;
  categories!: Category[];
}
