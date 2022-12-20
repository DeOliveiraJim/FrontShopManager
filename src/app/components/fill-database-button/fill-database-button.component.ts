import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';

const shops = require('./shop.json') as Array<any>;
const products = require('./product.json') as Array<any>;

@Component({
  selector: 'app-fill-database-button',
  templateUrl: './fill-database-button.component.html',
  styleUrls: ['./fill-database-button.component.css'],
})
export class FillDatabaseButtonComponent implements OnInit {
  private isRemoved = false;
  private isClicked = false;
  constructor(
    private viewContainer: ViewContainerRef,
    private categoryService: CategoryService,
    private shopService: ShopService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.categoryService.GetCategories().subscribe((cs) => {
      if (cs.length !== 0) this.removeSelf();
    });
    this.shopService.GetShops().subscribe((s) => {
      if (s.length !== 0) this.removeSelf();
    });
  }

  async onClick() {
    if (this.isClicked) return;
    this.isClicked = true;
    this.viewContainer.element.nativeElement.firstChild.firstChild.text =
      'Remplissage de la database ...';
    this.viewContainer.element.nativeElement.firstChild.firstChild.style.color =
      'white';
    this.fillDatabase();
    await new Promise((resolve) => setTimeout(resolve, 1400));
    location.reload();
  }

  private removeSelf() {
    if (this.isRemoved) return;
    this.isRemoved = true;
    this.viewContainer.element.nativeElement.parentElement.removeChild(
      this.viewContainer.element.nativeElement
    );
  }

  private async fillDatabase() {
    let ids: number[] = [];
    shops.forEach((s) => {
      this.shopService.CreateShop(s).subscribe((s) => {
        ids.push(s.id);
      });
    });
    await new Promise((resolve) => setTimeout(resolve, 800));
    products.forEach((p) => {
      this.productService
        .CreateProduct(ids[this.randomInt(ids.length)].toString(), p)
        .subscribe(() => {});
    });
  }

  private randomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
