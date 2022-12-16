import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/shared/category';
import { Product } from 'src/app/shared/product';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent extends AbstractComponent implements OnInit {
  productList: Product[] = [];
  searchList: Product[] = [];
  categories: Category[] = [];
  pages: number = 1;
  idShop!: string;
  orderName: string = '(croissant)';
  orderPrice: string = '(croissant)';
  orderNbProd: string = '(croissant)';
  sortNbName: number = -1;
  sortNbPrice: number = -1;

  constructor(
    public productService: ProductService,
    private actRoute: ActivatedRoute,
    private categoryService: CategoryService,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);

    this.idShop = this.actRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    return this.categoryService.GetCategories().subscribe({
      next: (data) => {
        this.categories.push(...data);
      },
      error: (err) => {
        this.showErrorAlert(err, 'shops/edit/' + this.idShop + '/products/');
      },
    });
  }

  // products list
  loadProducts() {
    return this.productService.GetProducts(this.idShop).subscribe({
      next: (data) => {
        this.productList.push(...data);
        this.searchList = Array.from(this.productList);
      },
      error: (err) => {
        this.showErrorAlert(err, 'shops/edit/' + this.idShop + '/products/');
      },
    });
  }

  // Delete shop
  deleteProduct(data: { name: string; id: string }) {
    var index = this.productList
      .map((shop: { name: string }) => {
        return shop.name;
      })
      .indexOf(data.name);
    return this.productService.DeleteShop(this.idShop, data.id).subscribe({
      next: () => {
        this.productList.splice(index, 1);
      },
      error: (err) => {
        this.showErrorAlert(err, 'shops/edit/' + this.idShop + '/products/');
      },
    });
  }

  redirectEditProduct(product: Product) {
    this.redirect('shops/edit/' + this.idShop + '/products/edit/' + product.id);
  }

  redirectAddProduct() {
    this.redirect('shops/' + this.idShop + '/products/add');
  }

  onSubmit(event: SubmitEvent) {
    if (event.target === null) return;
    const target = event.target as HTMLFormElement;
    const searchForm = target.childNodes[0] as HTMLInputElement;
    this.researchProduct(searchForm.value);
  }

  researchProduct(productName: string) {
    this.productList = Array.from(this.searchList);
    while (this.productList.length > 1) {
      this.productList.pop();
    }
    var product = this.searchList.find((product: { name: string }) => product.name == productName);
    if (product != undefined) {
      this.productList.unshift(product);
    }
    this.productList.pop();
  }

  resetSearch() {
    this.productList = Array.from(this.searchList);
  }

  sortData(sortingBy: string) {
    if (sortingBy == 'Nom') {
      if (this.orderName == '(croissant)') {
        this.orderName = '(décroissant)';
      } else {
        this.orderName = '(croissant)';
      }
      this.sortNbName = -this.sortNbName;

      this.productList.sort((a: { name: string }, b: { name: string }) => {
        if (a.name < b.name) {
          return -this.sortNbName;
        } else {
          return this.sortNbName;
        }
      });
    } else if (sortingBy == 'Prix') {
      if (this.orderPrice == '(croissant)') {
        this.orderPrice = '(décroissant)';
      } else {
        this.orderPrice = '(croissant)';
      }

      this.sortNbPrice = -this.sortNbPrice;

      this.productList.sort((a: { price: number }, b: { price: number }) => {
        if (a.price < b.price) {
          return -this.sortNbPrice;
        } else {
          return this.sortNbPrice;
        }
      });
    }
  }

  filter(category: Category) {
    this.productList = Array.from(this.searchList);
    this.productList = this.productList.filter((product) => product.categories.find((c) => c.name == category.name));
  }
}
