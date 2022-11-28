import { Category } from './category';

export class Product {
  id!: string;
  name!: string;
  price!: number;
  description!: string | null;
  categories!: Category[];
}
