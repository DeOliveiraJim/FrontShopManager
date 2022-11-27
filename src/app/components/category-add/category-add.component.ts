import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryForm!: FormGroup;
  ngOnInit() {
    this.addCategory();
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public categoryService: CategoryService
  ) {}
  addCategory() {
    this.categoryForm = this.fb.group({
      name: ['']
    });
  }
  submitForm() {
    this.categoryService.CreateCategory(this.categoryForm.value).subscribe((res) => {
      console.log('Shop ajoutée!');
      this.ngZone.run(() => this.router.navigateByUrl('/categories'));
    });
  }

}
