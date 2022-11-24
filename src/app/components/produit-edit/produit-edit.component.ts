import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.css']
})
export class ProduitEditComponent implements OnInit {

  produitList: any = [];
  updateProduitForm!: FormGroup;
  private idBoutique : string;
  private idProduit : string;
  baseurl: string = environment.baseurl;

  constructor(    
    private actRoute: ActivatedRoute,    
    public produitService: ProduitService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router 
    
    ) {

      this.idBoutique = this.actRoute.snapshot.paramMap.get('id')!;
      this.idProduit = this.actRoute.snapshot.paramMap.get('idProduit')!;
      this.produitService.GetProduit(this.idBoutique,this.idProduit).subscribe((data) => {
        this.updateProduitForm = this.fb.group({
          nom: [data.nom],
          prix: [data.prix],
          description: [data.description == null ? null : data.description.trim().length == 0 ? null : data.description]
        })
      })      
    
   }

  ngOnInit(): void {
    this.updateForm()
  }

  updateForm(){
    this.updateProduitForm = this.fb.group({
      nom: [''],
      prix: [''],
      description: ['']
    })    
  }

  submitForm(){ 
    
    this.produitService.UpdateProduit(this.idBoutique,this.idProduit, this.updateProduitForm.value).subscribe(res => {
      console.log('Produit édité!');
      console.log(this.updateProduitForm.value)
      this.ngZone.run(() => this.router.navigateByUrl('/boutique/all'))
    })
  }

}
