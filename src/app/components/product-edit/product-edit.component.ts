import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/shared/category';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent extends AbstractComponent implements OnInit {
  allCategoriesList: Omit<Category, 'id'>[] = [];
  updateProductForm!: FormGroup;
  private idShop: string;
  private idProduct: string;

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
    this.setFormWithProducts();
  }

  ngOnInit(): void {
    this.updateForm();
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
          'shops/edit/' + this.idShop + '/products/' + this.idProduct
        );
      },
    });
  }

  setFormWithProducts() {
    this.productService.GetProduct(this.idShop, this.idProduct).subscribe({
      next: (data) => {
        this.updateProductForm = this.fb.group({
          name: [data.name],
          price: [data.price],
          description: [data.description == null ? ' ' : data.description],
          categories: [[]],
        });
      },
      error: (err) => {
        this.showErrorAlert(
          err,
          'shops/edit/' + this.idShop + '/products/' + this.idProduct
        );
      },
    });
  }

  updateForm() {
    this.updateProductForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      categories: [''],
    });
  }
  submitForm() {
    if (this.updateProductForm.value.description?.trim().length == 0)
      this.updateProductForm.value.description = null;
    this.productService
      .UpdateProduct(this.idShop, this.idProduct, this.updateProductForm.value)
      .subscribe({
        next: (data) => {
          var id = this.actRoute.snapshot.paramMap.get('id')!;
          this.ngZone.run(() =>
            this.router.navigateByUrl('/shops/' + id + '/products')
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
}
