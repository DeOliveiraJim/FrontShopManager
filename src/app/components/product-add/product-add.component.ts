import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/shared/category';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent extends AbstractComponent implements OnInit {
  allCategoriesList: Omit<Category, 'id'>[] = [];
  productForm!: FormGroup;
  private idShop: string;
  private idProduct: string;
  submitted = false;

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.pattern(/[\S]/)],
      price: [''],
      description: [''],
      categories: [[]],
    });
  }

  constructor(
    private actRoute: ActivatedRoute,
    public fb: FormBuilder,
    ngZone: NgZone,
    router: Router,
    public productService: ProductService,
    public categoryService: CategoryService
  ) {
    super(ngZone, router);
    this.idShop = this.actRoute.snapshot.paramMap.get('id')!;
    this.idProduct = this.actRoute.snapshot.paramMap.get('idProduct')!;
    this.getCategories();
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
        this.showErrorAlert(err, 'shops/edit/' + this.idShop + '/products/' + this.idProduct);
      },
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productService.CreateProduct(this.idShop, this.productForm.value).subscribe({
      next: () => {
        this.redirect('/shops/' + this.idShop + '/products');
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops/' + this.idShop + '/products');
      },
    });
  }
}
