import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FillDatabaseButtonComponent } from './components/fill-database-button/fill-database-button.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailFormComponent } from './components/product-detail-form/product-detail-form.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShopAddComponent } from './components/shop-add/shop-add.component';
import { ShopEditComponent } from './components/shop-edit/shop-edit.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopOpeningTimeComponent } from './components/shop-opening-time-form/shop-opening-time-form.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShopService } from './services/shop.service';

@NgModule({
  declarations: [
    ShopAddComponent,
    ShopEditComponent,
    ShopListComponent,
    AppComponent,
    NavigationBarComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductAddComponent,
    CategoryAddComponent,
    CategoryListComponent,
    CategoryEditComponent,
    ShopOpeningTimeComponent,
    FillDatabaseButtonComponent,
    ProductDetailFormComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [ShopService, ProductService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
