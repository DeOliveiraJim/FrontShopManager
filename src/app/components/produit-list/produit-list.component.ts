import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {


  produitList : any = [];
  pages: number = 1;


  constructor(
    public produitService: ProduitService,
    private actRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router    
  ){ }

  ngOnInit(): void {
    this.loadProduits();
  }

  // produits list
  loadProduits() {
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    return this.produitService.GetProduits(id).subscribe((data: {}) => {
      this.produitList = data;
    })    
  }

  // Delete boutique
    deleteProduit(data: { nom: string; id: string; }){
      var id = this.actRoute.snapshot.paramMap.get('id')!;
      var index = this.produitList.map((boutique: { nom: string; }) => {return boutique.nom}).indexOf(data.nom);
        return this.produitService.DeleteBoutique(id,data.id).subscribe(res => {
        this.produitList.splice(index, 1)
        console.log('Produit supprimée!')
        })    
    }

    redirectEditProduit(data : any) {
      var id = this.actRoute.snapshot.paramMap.get('id')!;
      this.ngZone.run(() => this.router.navigateByUrl('boutique/edit/' + id + '/produits/edit/' + data.id))

    }
}
