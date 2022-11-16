import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BoutiqueService } from 'src/app/boutique.service';

@Component({
  selector: 'app-boutique-add',
  templateUrl: './boutique-add.component.html',
  styleUrls: ['./boutique-add.component.css']
})
export class BoutiqueAddComponent implements OnInit {

  boutiqueForm!: FormGroup;
  ngOnInit() {
    this.addBoutique();
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public boutiqueService: BoutiqueService
  ) {}
  addBoutique() {
    this.boutiqueForm = this.fb.group({
      nom: [''],
      horaires: [''],
      conge: ['']
    });
  }
  submitForm() {
    this.boutiqueService.CreateBoutique(this.boutiqueForm.value).subscribe((res) => {
      console.log('Boutique ajoutée!');
      this.ngZone.run(() => this.router.navigateByUrl('/boutique/all'));
    });
  }

}
