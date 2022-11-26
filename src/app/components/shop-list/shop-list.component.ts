import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  shopList: any = [];
  pages: number = 1;
  orderName : string = "(croissant)";
  orderDate : string = "(croissant)";
  orderNbProd : string = "(croissant)";
  vacation : string = "";
  sortNbName : number = -1;
  sortNbDate : number = -1;

  ngOnInit() {
    this.loadShops();
  }
  constructor(
    public shopService: ShopService
  ){ }
   // shops list
   loadShops() {
    return this.shopService.GetShops().subscribe((data: {}) => {
      this.shopList = data;
      console.log("data");
      console.log(data);
    })
    }
    // Delete shop
    deleteShop(data: { name: string; id: string; }){
      var index = this.shopList.map((shop: { name: string; }) => {return shop.name}).indexOf(data.name);
       return this.shopService.DeleteShop(data.id).subscribe(res => {
        this.shopList.splice(index, 1)
         console.log('Shop supprimée!')
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

        this.shopList.sort( (a: { name: string; }, b: { name: string; }) => {
          if (a.name < b.name) {
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

      this.shopList.sort( (a: { dateCreation: Date; }, b: { dateCreation: Date; }) => {
        if (a.dateCreation < b.dateCreation) {
          return -this.sortNbDate;
        } else {
          return this.sortNbDate;
        }
    });


    }

  
    
  }

}
