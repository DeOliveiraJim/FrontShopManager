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

export function getAName(p: Product) {
  let x = p.details.findIndex((x) => x.lang == 'fr');
  if (x != -1) {
    return p.details[x].name;
  }
  x = p.details.findIndex((x) => x.lang == 'en');
  if (x != -1) {
    return p.details[x].name;
  }
  return p.details[0].name;
}
