import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm!: FormGroup;
  ngOnInit() {
    this.addShop();
  }
  constructor(
    private actRoute: ActivatedRoute, 
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public productService: ProductService
  ) {}
  addShop() {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      description: ['']
    });
  }
  submitForm() {
    if (this.productForm.value.description?.trim().length == 0) this.productForm.value.description = null;
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.productService.CreateProduct(id,this.productForm.value).subscribe((res) => {
      console.log('product ajoutée!');
      this.ngZone.run(() => this.router.navigateByUrl('/shops/' + id + '/products'));
    });
  }

}
