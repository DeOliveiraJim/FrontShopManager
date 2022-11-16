import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoutiqueAddComponent } from './components/boutique-add/boutique-add.component';
import { BoutiqueEditComponent } from './components/boutique-edit/boutique-edit.component';
import { BoutiqueListComponent } from './components/boutique-list/boutique-list.component';
import { RouterModule } from '@angular/router';
import { BoutiqueService } from './boutique.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoutiqueAddComponent,
    BoutiqueEditComponent,
    BoutiqueListComponent,
    AppComponent
  ],
  imports : [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BoutiqueService],
  bootstrap: [AppComponent]
})
export class AppModule { }