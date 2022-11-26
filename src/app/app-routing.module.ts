import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopAddComponent } from './components/shop-add/shop-add.component';
import { ShopEditComponent } from './components/shop-edit/shop-edit.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/shops' },
  { path: 'shops/add', component: ShopAddComponent },
  { path: 'shops/edit/:id', component: ShopEditComponent },
  { path: 'shops', component: ShopListComponent },
  { path: 'categories/add', component: CategoryAddComponent },
  { path: 'categories/edit/:id', component: CategoryEditComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'shops/:id/products', component: ProductListComponent },
  { path: 'shops/edit/:id/products/edit/:idProduct', component: ProductEditComponent },
  { path: 'shops/:id/products/add', component: ProductAddComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}