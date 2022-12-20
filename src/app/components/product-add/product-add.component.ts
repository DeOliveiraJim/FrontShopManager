import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent extends AbstractComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;
  ngOnInit() {
    this.addShop();
  }
  constructor(
    private actRoute: ActivatedRoute,
    public fb: FormBuilder,
    ngZone: NgZone,
    router: Router,
    public productService: ProductService
  ) {
    super(ngZone, router);
  }
  addShop() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
    });
  }
  get ctrls() {
    return this.productForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.productService.CreateProduct(id, this.productForm.value).subscribe({
      next: () => {
        this.redirect('/shops/' + id + '/products');
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops/' + id + '/products');
      },
    });
  }
}
