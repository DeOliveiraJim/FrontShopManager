import { Component, Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shared/shop';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class ShopListComponent extends AbstractComponent implements OnInit {
  shopList: Shop[] = [];
  searchList: Shop[] = [];
  pages: number = 1;
  orderName: string = '(croissant)';
  orderDate: string = '(croissant)';
  orderNbProd: string = '(croissant)';
  vacation: string = '';
  sortNbName: number = -1;
  sortNbDate: number = -1;
  sortNbProd: number = -1;
  searchByConge: 'null' | 'false' | 'true' = 'null';

  ngOnInit() {
    this.loadShops();
  }
  constructor(public shopService: ShopService, public override ngZone: NgZone, public override router: Router) {
    super(ngZone, router);
  }
  // shops list
  loadShops() {
    this.shopService.GetShops().subscribe({
      next: (shops) => {
        this.shopList.push(...shops);
        this.searchList = Array.from(this.shopList);
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops');
      },
    });
  }
  // Delete shop
  deleteShop(data: Shop) {
    var index = this.shopList
      .map((shop: { name: string }) => {
        return shop.name;
      })
      .indexOf(data.name);
    return this.shopService.DeleteShop(data.id).subscribe({
      next: (shops) => {
        this.shopList.splice(index, 1);
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops');
      },
    });
  }
  onSubmit(event: SubmitEvent) {
    if (event.target === null) return;
    const target = event.target as HTMLFormElement;
    const searchForm = target.childNodes[0] as HTMLInputElement;
    this.researchShop(searchForm.value);
  }

  researchShop(shopName: string) {
    var dateAfter = new Date((<HTMLInputElement>document.getElementById('dateAfterSearch')).value);

    var dateBefore = new Date((<HTMLInputElement>document.getElementById('dateBeforeSearch')).value);

    var dateBetween1 = new Date((<HTMLInputElement>document.getElementById('dateBetweenSearch1')).value);

    var dateBetween2 = new Date((<HTMLInputElement>document.getElementById('dateBetweenSearch2')).value);

    this.searchByConge = <'null' | 'true' | 'false'>(<HTMLSelectElement>document.getElementById('congeSearch')).value;

    this.shopList = Array.from(this.searchList)
      .filter((shop: { name: string; vacation: boolean; creationDate: Date }) =>
        shop.name.includes(shopName) && this.searchByConge !== 'null'
          ? shop.vacation === (this.searchByConge === 'false' ? false : true)
          : true &&
            (dateAfter.toString().length == 12 ? true : shop.creationDate > dateAfter) &&
            (dateBefore.toString().length == 12 ? true : shop.creationDate < dateBefore) &&
            (dateBetween1.toString().length == 12 && dateBetween2.toString().length == 12
              ? true
              : shop.creationDate > dateBetween1 && shop.creationDate < dateBetween2)
      )
      .sort((a, b) => (a.name.length < b.name.length ? -1 : 1));
  }

  resetSearch() {
    this.shopList = Array.from(this.searchList);
  }

  sortData(sortingBy: string) {
    if (sortingBy == 'Name') {
      if (this.orderName == '(croissant)') {
        this.orderName = '(décroissant)';
      } else {
        this.orderName = '(croissant)';
      }
      this.sortNbName = -this.sortNbName;

      this.shopList.sort((a: { name: string }, b: { name: string }) => {
        if (a.name < b.name) {
          return -this.sortNbName;
        } else {
          return this.sortNbName;
        }
      });
    } else if (sortingBy == 'Date') {
      if (this.orderDate == '(croissant)') {
        this.orderDate = '(décroissant)';
      } else {
        this.orderDate = '(croissant)';
      }

      this.sortNbDate = -this.sortNbDate;

      this.shopList.sort((a, b) => {
        if (a.creationDate < b.creationDate) {
          return -this.sortNbDate;
        } else {
          return this.sortNbDate;
        }
      });
    }
    if (sortingBy == 'nbProducts') {
      if (this.orderNbProd == '(croissant)') {
        this.orderNbProd = '(décroissant)';
      } else {
        this.orderNbProd = '(croissant)';
      }

      this.sortNbProd = -this.sortNbProd;

      this.shopList.sort((a, b) => {
        if (a.nbProducts < b.nbProducts) {
          return -this.sortNbProd;
        } else {
          return this.sortNbProd;
        }
      });
    }
  }
}
