import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoutiqueAddComponent } from './components/boutique-add/boutique-add.component';
import { BoutiqueEditComponent } from './components/boutique-edit/boutique-edit.component';
import { BoutiqueListComponent } from './components/boutique-list/boutique-list.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'boutique/all' },
  { path: 'boutique/add', component: BoutiqueAddComponent },
  { path: 'boutique/edit/:id', component: BoutiqueEditComponent },
  { path: 'boutique/all', component: BoutiqueListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}