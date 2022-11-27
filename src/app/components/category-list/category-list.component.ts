import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList: any = [];
  pages: number = 1;
  orderName : string = "(croissant)";
  sortNbName : number = -1;
  searchList: any = [];

  ngOnInit() {
    this.loadCategorys();
  }
  constructor(
    public categoryService: CategoryService
  ){ }
   // categorys list
   loadCategorys() {
    return this.categoryService.GetCategorys().subscribe((data: {}) => {
      this.categoryList = data;
      this.searchList = Array.from(this.categoryList);
    })
    }
    // Delete category
    deleteCategory(data: { name: string; id: string; }){
      var index = this.categoryList.map((category: { name: string; }) => {return category.name}).indexOf(data.name);
       return this.categoryService.DeleteCategory(data.id).subscribe(res => {
        this.categoryList.splice(index, 1)
         console.log('category supprimée!')
       })    
    }


    onSubmit(event: any) {      
      this.researchShop(event.target.search.value);
    }

    researchShop(categoryName : string) {
      this.categoryList = Array.from(this.searchList);
      while (this.categoryList.length > 1) {
        this.categoryList.pop();
      }
      var category = this.searchList.find((category: { name: string; }) => category.name == categoryName);
      if(category != undefined) {
        this.categoryList.unshift(category);   
      }    
      this.categoryList.pop();
    }

    resetSearch() {
      this.categoryList = Array.from(this.searchList);
    }


    sortData(sortingBy : string) {     

      if(sortingBy == "Nom") {

        if(this.orderName == "(croissant)") {
          this.orderName = "(décroissant)";        
        }
        else {
          this.orderName = "(croissant)";
        }
        this.sortNbName = -this.sortNbName;

        this.categoryList.sort( (a: { name: string; }, b: { name: string; }) => {
          if (a.name < b.name) {
            return -this.sortNbName;
          } else {
            return this.sortNbName;
          }
      });


    }


    }

  
    
  }

