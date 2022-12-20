import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/category';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent extends AbstractComponent implements OnInit {
  categoryList: Category[] = [];
  pages: number = 1;
  orderName: string = '(croissant)';
  sortNbName: number = -1;
  searchList: Category[] = [];

  ngOnInit() {
    this.loadCategories();
  }
  constructor(
    public categoryService: CategoryService,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
  }
  // categorys list
  loadCategories() {
    return this.categoryService.GetCategories().subscribe((data) => {
      this.categoryList.push(...data);
      this.searchList = Array.from(this.categoryList);
    });
  }
  // Delete category
  deleteCategory(data: Category) {
    let index = this.categoryList
      .map((category: { name: string }) => {
        return category.name;
      })
      .indexOf(data.name);
    return this.categoryService.DeleteCategory(data.id).subscribe((res) => {
      this.categoryList.splice(index, 1);
    });
  }

  onSubmit(event: SubmitEvent) {
    if (event.target === null) return;
    const target = event.target as HTMLFormElement;
    const searchForm = target.childNodes[0] as HTMLInputElement;
    this.research(searchForm.value);
  }

  research(categoryName: string) {
    this.categoryList = Array.from(this.searchList)
      .filter((category: { name: string }) =>
        category.name.includes(categoryName)
      )
      .sort((a, b) => (a.name.length < b.name.length ? -1 : 1));
  }

  resetSearch() {
    this.categoryList = Array.from(this.searchList);
  }

  sortData(sortingBy: string) {
    if (sortingBy == 'Nom') {
      if (this.orderName == '(croissant)') {
        this.orderName = '(décroissant)';
      } else {
        this.orderName = '(croissant)';
      }
      this.sortNbName = -this.sortNbName;

      this.categoryList.sort((a: { name: string }, b: { name: string }) => {
        if (a.name < b.name) {
          return -this.sortNbName;
        } else {
          return this.sortNbName;
        }
      });
    }
  }
}
