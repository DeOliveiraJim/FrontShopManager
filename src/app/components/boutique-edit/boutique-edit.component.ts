import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoutiqueService } from 'src/app/boutique.service';

@Component({
  selector: 'app-boutique-edit',
  templateUrl: './boutique-edit.component.html',
  styleUrls: ['./boutique-edit.component.css']
})
export class BoutiqueEditComponent implements OnInit {

  boutiqueList: any = [];
  updateBoutiqueForm!: FormGroup;
  
  ngOnInit() {
    this.updateForm()
  }
  constructor(
    private actRoute: ActivatedRoute,    
    public boutiqueService: BoutiqueService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.boutiqueService.GetBoutique(id).subscribe((data) => {
      this.updateBoutiqueForm = this.fb.group({
        nom: [data.nom],
        horaires: [data.horaires],
        conge: [data.conge]
      })
    })
  }
  updateForm(){
    this.updateBoutiqueForm = this.fb.group({
      nom: [''],
      horaires: [''],
      conge: ['']
    })    
  }
  submitForm(){ 
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.boutiqueService.UpdateBoutique(id, this.updateBoutiqueForm.value).subscribe(res => {
      console.log(id);
      console.log('Boutique éditée!');
      console.log(this.updateBoutiqueForm.value)
      this.ngZone.run(() => this.router.navigateByUrl('/boutique/all'))
    })
  }
}
