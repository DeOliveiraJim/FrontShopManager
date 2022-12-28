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
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent extends AbstractComponent implements OnInit {
  allCategoriesList: Omit<Category, 'id'>[] = [];
  productForm!: FormGroup;
  idShop: string;
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
    this.getCategories();
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      price: [0],
      categories: [[]],
    });
  }

  ngAfterViewInit() {
    // workaround moche pour éviter une erreur
    setTimeout(() => this.addProductDetail(), 0);
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
        this.showErrorAlert(err, 'shops/' + this.idShop + '/products');
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
    this.productService.CreateProduct(this.idShop, product).subscribe({
      next: () => {
        this.redirect('/shops/' + this.idShop + '/products');
      },
      error: (err) => {
        this.showErrorAlert(err, 'shops/' + this.idShop + '/products');
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
