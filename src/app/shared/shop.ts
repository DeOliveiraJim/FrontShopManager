export class Shop {
  id!: number;
  name!: string;
  openingTimes!: {
    days: (string | number)[];
    start: string;
    end: string;
  }[];
  vacation!: boolean;
  creationDate!: Date;
  nbCategories!: number;
  nbProducts!: string;
}
