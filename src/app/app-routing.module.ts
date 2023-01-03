import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShopAddComponent } from './components/shop-add/shop-add.component';
import { ShopEditComponent } from './components/shop-edit/shop-edit.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/shops' },

  {
    path: 'shops',
    component: ShopListComponent,
    data: { animation: { x: 0, y: 0 } },
  },
  {
    path: 'shops/add',
    component: ShopAddComponent,
    data: { animation: { x: 0, y: 1 } },
  },
  {
    path: 'shops/edit/:id',
    component: ShopEditComponent,
    data: { animation: { x: 0, y: 1 } },
  },
  {
    path: 'shops/:id/products',
    component: ProductListComponent,
    data: { animation: { x: 0, y: 1 } },
  },
  {
    path: 'shops/:id/products/edit/:idProduct',
    component: ProductEditComponent,
    data: { animation: { x: 0, y: 2 } },
  },
  {
    path: 'shops/:id/products/add',
    component: ProductAddComponent,
    data: { animation: { x: 0, y: 2 } },
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    data: { animation: { x: 1, y: 0 } },
  },
  {
    path: 'categories/add',
    component: CategoryAddComponent,
    data: { animation: { x: 1, y: 1 } },
  },
  {
    path: 'categories/edit/:id',
    component: CategoryEditComponent,
    data: { animation: { x: 1, y: 1 } },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
