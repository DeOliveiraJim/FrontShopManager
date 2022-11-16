import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoutiqueService } from 'src/app/boutique.service';

@Component({
  selector: 'app-boutique-list',
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.css']
})
export class BoutiqueListComponent implements OnInit {

  boutiqueList: any = [];

  ngOnInit() {
    this.loadBoutiques();
  }
  constructor(
    public boutiqueService: BoutiqueService,
    private router: Router
  ){ }
   // boutiques list
   loadBoutiques() {
    return this.boutiqueService.GetBoutiques().subscribe((data: {}) => {
      this.boutiqueList = data;
    })
  }
    // Delete boutique
    deleteBoutique(data: { nom: string; id: string; }){
      var index = this.boutiqueList.map((boutique: { nom: string; }) => {return boutique.nom}).indexOf(data.nom);
       return this.boutiqueService.DeleteBoutique(data.id).subscribe(res => {
        this.boutiqueList.splice(index, 1)
         console.log('Boutique supprimée!')
       })
  }

  goToAdd() {
    this.router.navigateByUrl('/boutique/add');
  }
}
