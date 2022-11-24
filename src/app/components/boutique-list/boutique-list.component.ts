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
  pages: number = 1;
  orderName : string = "(croissant)";
  orderDate : string = "(croissant)";
  orderNbProd : string = "(croissant)";
  conge : string = "";
  sortNbName : number = -1;
  sortNbDate : number = -1;

  ngOnInit() {
    this.loadBoutiques();
  }
  constructor(
    public boutiqueService: BoutiqueService
  ){ }
   // boutiques list
   loadBoutiques() {
    return this.boutiqueService.GetBoutiques().subscribe((data: {}) => {
      this.boutiqueList = data;
      console.log("data");
      console.log(data);
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

    sortData(sortingBy : string) {     

      if(sortingBy == "Nom") {

        if(this.orderName == "(croissant)") {
          this.orderName = "(décroissant)";        
        }
        else {
          this.orderName = "(croissant)";
        }
        this.sortNbName = -this.sortNbName;

        this.boutiqueList.sort( (a: { nom: string; }, b: { nom: string; }) => {
          if (a.nom < b.nom) {
            return -this.sortNbName;
          } else {
            return this.sortNbName;
          }
      });


    }

    else if(sortingBy == "Date") {

      if(this.orderDate == "(croissant)") {
        this.orderDate = "(décroissant)";
      }
      else {
        this.orderDate = "(croissant)";
      }


      this.sortNbDate = -this.sortNbDate;

      this.boutiqueList.sort( (a: { dateCreation: Date; }, b: { dateCreation: Date; }) => {
        if (a.dateCreation < b.dateCreation) {
          return -this.sortNbDate;
        } else {
          return this.sortNbDate;
        }
    });


    }

  
    
  }

}
