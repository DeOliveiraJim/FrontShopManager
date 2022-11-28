import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ShopListComponent implements OnInit {

  shopList: any = [];
  searchList: any = [];
  pages: number = 1;
  orderName : string = "(croissant)";
  orderDate : string = "(croissant)";
  orderNbProd : string = "(croissant)";
  vacation : string = "";
  sortNbName : number = -1;
  sortNbDate : number = -1;
  sortNbProd : number = -1;
  searchByConge : boolean = false;


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
      this.searchList = Array.from(this.shopList);
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
    onSubmit(event: any) {      
      this.researchShop(event.target.search.value);
    }



    researchShop(shopName : string) {
      this.searchByConge = ((<HTMLInputElement>document.getElementById("congeSearch")).checked);
      this.shopList = Array.from(this.searchList);
      while (this.shopList.length > 1) {
        this.shopList.pop();
      }
      console.log(this.searchList);
      var shop = this.searchList.find((shop: { name: string; vacation: boolean; }) => shop.name == shopName && shop.vacation == this.searchByConge);
      console.log(shop);
      if(shop != undefined) {
        this.shopList.unshift(shop);   
      }    
      this.shopList.pop();
    }

    resetSearch() {
      this.shopList = Array.from(this.searchList);
    }




    sortData(sortingBy : string) {     

      if(sortingBy == "Name") {

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

      this.shopList.sort( (a: { creationDate : Date; }, b: { creationDate: Date; }) => {
        if (a.creationDate < b.creationDate) {
          return -this.sortNbDate;
        } else {
          return this.sortNbDate;
        }
    });


    }
    

    else if(sortingBy == "nbProducts") {

      if(this.orderNbProd == "(croissant)") {
        this.orderNbProd = "(décroissant)";
      }
      else {
        this.orderNbProd = "(croissant)";
      }


      this.sortNbProd = -this.sortNbProd;

      this.shopList.sort( (a: { nbProducts: number; }, b: { nbProducts: number; }) => {
        if (a.nbProducts < b.nbProducts) {
          return -this.sortNbProd;
        } else {
          return this.sortNbProd;
        }
    });

    }    
    
  }

}
