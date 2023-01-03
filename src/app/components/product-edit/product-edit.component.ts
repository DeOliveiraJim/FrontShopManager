import {
  Component,
  ComponentRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/shared/category';
import { AbstractComponent } from '../abstract/abstract.component';
import { ProductDetailFormComponent } from '../product-detail-form/product-detail-form.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent extends AbstractComponent implements OnInit {
  allCategoriesList: Omit<Category, 'id'>[] = [];
  productForm!: FormGroup;
  idShop: string;
  idProduct: string;
  productDetails: ComponentRef<ProductDetailFormComponent>[] = [];
  submitted: boolean = false;

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(
    private actRoute: ActivatedRoute,
    public productService: ProductService,
    public fb: FormBuilder,
    public categoryService: CategoryService,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);

    this.idShop = this.actRoute.snapshot.paramMap.get('id')!;
    this.idProduct = this.actRoute.snapshot.paramMap.get('idProduct')!;
    this.getCategories();
    this.setFormWithProduct();
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      price: [0],
      categories: [[]],
    });
  }

  get ctrls() {
    return this.productForm.controls;
  }

  getCategories() {
    this.categoryService.GetCategories().subscribe({
      next: (data) => {
        let cat = data.map((c) => {
          return { name: c.name };
        });
        this.allCategoriesList.push(...cat);
      },
      error: (err) => {
        this.showErrorAlert(
          err,
          'shops/' + this.idShop + '/products/edit/' + this.idProduct
        );
      },
    });
  }

  setFormWithProduct() {
    this.productService.GetProduct(this.idShop, this.idProduct).subscribe({
      next: (data) => {
        for (let d of data.details) {
          let productDetailRef = this.container.createComponent(
            ProductDetailFormComponent
          );
          let pdc = productDetailRef.instance;
          pdc.productDetailForm.controls['name'].setValue(d.name);
          pdc.productDetailForm.controls['description'].setValue(d.description);
          pdc.productDetailForm.controls['lang'].setValue(d.lang);
          this.productDetails.push(productDetailRef);
        }
        this.productForm.controls['price'].setValue(data.price);
        this.productForm.controls['categories'].setValue(
          this.allCategoriesList.filter(
            (c) => data.categories.find((sc) => sc.name == c.name) !== undefined
          )
        );
      },
      error: (err) => {
        this.showErrorAlert(
          err,
          'shops/edit/' + this.idShop + '/products/' + this.idProduct
        );
      },
    });
  }

  submitForm() {
    this.submitted = true;
    let error = false;
    for (let detail of this.productDetails) {
      detail.instance.submitted = true;
      if (detail.instance.productDetailForm.invalid) error = true;
    }
    if (error) return;
    if (this.productForm.invalid) return;
    let product = this.productForm.value;
    product.details = this.productDetails.map(
      (x) => x.instance.productDetailForm.value
    );
    this.productService
      .UpdateProduct(this.idShop, this.idProduct, product)
      .subscribe({
        next: () => {
          this.redirect('/shops/' + this.idShop + '/products');
        },
        error: (err) => {
          this.showErrorAlert(
            err,
            'shops/edit/' + this.idShop + '/products/' + this.idProduct
          );
        },
      });
  }

  addProductDetail() {
    let c = this.container.createComponent(ProductDetailFormComponent);
    c.instance.closeItem.subscribe(() => {
      let i = this.productDetails.findIndex((x) => x == c);
      if (i !== -1) {
        this.productDetails.splice(i);
      }
      c.destroy();
    });
    this.productDetails.push(c);
  }
}
