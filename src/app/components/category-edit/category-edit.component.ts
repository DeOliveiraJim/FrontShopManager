import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent extends AbstractComponent implements OnInit {
  updateCategoryForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.updateForm();
  }
  constructor(
    private actRoute: ActivatedRoute,
    public categoryService: CategoryService,
    public fb: FormBuilder,
    ngZone: NgZone,
    router: Router
  ) {
    super(ngZone, router);
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.categoryService.GetCategory(id).subscribe({
      next: (data) => {
        this.updateCategoryForm = this.fb.group({
          name: [data.name, Validators.pattern(/[\S]/)],
        });
      },
      error: (err) => {
        this.showErrorAlert(err, '/categories/');
      },
    });
  }
  updateForm() {
    this.updateCategoryForm = this.fb.group({
      name: ['', Validators.pattern(/[\S]/)],
    });
  }

  get ctrls() {
    return this.updateCategoryForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.updateCategoryForm.invalid) {
      return;
    }
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.categoryService
      .UpdateCategory(id, this.updateCategoryForm.value)
      .subscribe(() => {
        this.redirect('/categories');
      });
  }
}
