import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  productList : any = [];
  searchList: any = [];
  pages: number = 1;
  idShop !: string;
  orderName : string = "(croissant)";
  orderPrice : string = "(croissant)";
  orderNbProd : string = "(croissant)";
  sortNbName : number = -1;
  sortNbPrice : number = -1;  
  

  constructor(
    public productService: ProductService,
    private actRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router    
    
  ){ 

    this.idShop = this.actRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // products list
  loadProducts() {
    
    return this.productService.GetProducts(this.idShop).subscribe((data : {}) => {
      this.productList = data;
      this.searchList = Array.from(this.productList);
    })    
  }

  // Delete shop
    deleteProduct(data: { name: string; id: string; }){
      var index = this.productList.map((shop: { name: string; }) => {return shop.name}).indexOf(data.name);
        return this.productService.DeleteShop(this.idShop,data.id).subscribe(res => {
        this.productList.splice(index, 1)
        console.log('product supprimée!')
        })    
    }

    redirectEditProduct(data : any) {
      this.ngZone.run(() => this.router.navigateByUrl('shops/edit/' + this.idShop + '/products/edit/' + data.id))

    }

    redirectAddProduct() {
      this.ngZone.run(() => this.router.navigateByUrl('shops/' + this.idShop + '/products/add'))
    }

    onSubmit(event: any) {      
      this.researchProduct(event.target.search.value);
    }

    researchProduct(productName : string) {
      this.productList = Array.from(this.searchList);
      while (this.productList.length > 1) {
        this.productList.pop();
      }
      var product = this.searchList.find((product: { name: string; }) => product.name == productName);
      if(product != undefined) {
        this.productList.unshift(product);   
      }    
      this.productList.pop();
    }

    resetSearch() {
      this.productList = Array.from(this.searchList);
    }


    sortData(sortingBy : string) {     

      if(sortingBy == "Nom") {

        if(this.orderName == "(croissant)") {
          this.orderName = "(décroissant)";        
        }
        else {
          this.orderName = "(croissant)";
        }
        this.sortNbName = -this.sortNbName;

        this.productList.sort( (a: { name: string; }, b: { name: string; }) => {
          if (a.name < b.name) {
            return -this.sortNbName;
          } else {
            return this.sortNbName;
          }
      });


    }

    else if(sortingBy == "Prix") {

      if(this.orderPrice == "(croissant)") {
        this.orderPrice = "(décroissant)";
      }
      else {
        this.orderPrice = "(croissant)";
      }


      this.sortNbPrice = -this.sortNbPrice;

      this.productList.sort( (a: { price: number; }, b: { price: number; }) => {
        if (a.price < b.price) {
          return -this.sortNbPrice;
        } else {
          return this.sortNbPrice;
        }
    });


    }

  
    
  }
}
