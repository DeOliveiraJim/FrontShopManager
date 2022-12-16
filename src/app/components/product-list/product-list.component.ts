import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  searchList: Product[] = [];
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
    private ngZone: NgZone,
    private router: Router
  ) {
    this.idShop = this.actRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // products list
  loadProducts() {
    return this.productService.GetProducts(this.idShop).subscribe((data) => {
      this.productList.push(...data);
      this.searchList = Array.from(this.productList);
    });
  }

  // Delete shop
  deleteProduct(data: { name: string; id: string }) {
    var index = this.productList
      .map((shop: { name: string }) => {
        return shop.name;
      })
      .indexOf(data.name);
    return this.productService
      .DeleteShop(this.idShop, data.id)
      .subscribe((res) => {
        this.productList.splice(index, 1);
        console.log('product supprimée!');
      });
  }

  redirectEditProduct(product: Product) {
    this.ngZone.run(() =>
      this.router.navigateByUrl(
        'shops/edit/' + this.idShop + '/products/edit/' + product.id
      )
    );
  }

  redirectAddProduct() {
    this.ngZone.run(() =>
      this.router.navigateByUrl('shops/' + this.idShop + '/products/add')
    );
  }

  onSubmit(event: SubmitEvent) {
    if (event.target === null) return;
    const target = event.target as HTMLFormElement;
    const searchForm = target.childNodes[0] as HTMLInputElement;
    this.researchProduct(searchForm.value);
  }

  researchProduct(productName: string) {
    this.productList = Array.from(this.searchList).filter(
      (category: { name: string }) => category.name.includes(productName)
    ).sort((a, b) => a.name.length < b.name.length ? -1 : 1);
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



  


}
