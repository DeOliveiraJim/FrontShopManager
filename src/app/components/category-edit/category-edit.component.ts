import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryList: any = [];
  updateCategoryForm!: FormGroup;
  
  ngOnInit() {
    this.updateForm()
  }
  constructor(
    private actRoute: ActivatedRoute,    
    public categoryService: CategoryService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.categoryService.GetCategorys().subscribe((data) => {
      this.updateCategoryForm = this.fb.group({
        name: [data.name]
      })
    })
  }
  updateForm(){
    this.updateCategoryForm = this.fb.group({
      name: ['']
    })    
  }
  submitForm(){ 
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.categoryService.UpdateCategory(id, this.updateCategoryForm.value).subscribe(res => {
      console.log(id);
      console.log('Category éditée!');
      console.log(this.updateCategoryForm.value)
      this.ngZone.run(() => this.router.navigateByUrl('/category/all'))
    })
  }
}
