import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent extends AbstractComponent implements OnInit {
  categoryForm!: FormGroup;
  submitted: boolean = false;
  ngOnInit() {
    this.addCategory();
  }
  constructor(public fb: FormBuilder, ngZone: NgZone, router: Router, public categoryService: CategoryService) {
    super(ngZone, router);
  }
  addCategory() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get ctrls() {
    return this.categoryForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    this.categoryService.CreateCategory(this.categoryForm.value).subscribe((res) => {
      this.redirect('/categories');
    });
  }
}
