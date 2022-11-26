import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productList: any = [];
  updateProductForm!: FormGroup;
  private idShop : string;
  private idProduct : string;
  baseurl: string = environment.baseurl;

  constructor(    
    private actRoute: ActivatedRoute,    
    public productService: ProductService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router 
    
    ) {

      this.idShop = this.actRoute.snapshot.paramMap.get('id')!;
      this.idProduct = this.actRoute.snapshot.paramMap.get('idProduct')!;
      this.productService.GetProduct(this.idShop,this.idProduct).subscribe((data) => {
        this.updateProductForm = this.fb.group({
          name: [data.name],
          price: [data.price],
          description: [data.description == null ? ' ' : data.description]
        })
      })      
    
   }

  ngOnInit(): void {
    this.updateForm()
  }

  updateForm(){
    this.updateProductForm = this.fb.group({
      name: [''],
      price: [''],
      description: ['']
    })    
  }

  submitForm(){ 
    if (this.updateProductForm.value.description?.trim().length == 0) this.updateProductForm.value.description = null;
    this.productService.UpdateProduct(this.idShop,this.idProduct, this.updateProductForm.value).subscribe(res => {
      console.log('product édité!');
      console.log(this.updateProductForm.value)
      this.ngZone.run(() => this.router.navigateByUrl('/shops/'))
    })
  }

}
