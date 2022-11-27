import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/shared/category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productList: any = [];
  allCategoriesList : any = [];
  updateProductForm!: FormGroup;
  private idShop : string;
  private idProduct : string;
  baseurl: string = environment.baseurl;
  

  constructor(    
    private actRoute: ActivatedRoute,    
    public productService: ProductService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public categoryService : CategoryService
    
    ) {

      this.idShop = this.actRoute.snapshot.paramMap.get('id')!;
      this.idProduct = this.actRoute.snapshot.paramMap.get('idProduct')!;
      this.categoryService.GetCategorys().subscribe((data : {}) => {
        this.allCategoriesList = data;
      })
      this.productService.GetProduct(this.idShop,this.idProduct).subscribe((data) => {
        this.updateProductForm = this.fb.group({
          name: [data.name],
          price: [data.price],
          description: [data.description == null ? ' ' : data.description],
          categories: []
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
      description: [''],
      categories: ['']
    })    
  }

  submitForm(){ 
    if (this.updateProductForm.value.description?.trim().length == 0) this.updateProductForm.value.description = null;
    console.log(this.updateProductForm.value);
     this.productService.UpdateProduct(this.idShop,this.idProduct, this.updateProductForm.value).subscribe(res => {
       console.log('product édité!');
       var id = this.actRoute.snapshot.paramMap.get('id')!;
       this.ngZone.run(() => this.router.navigateByUrl('/shops/' + id + '/products'));
     })
  }

}
