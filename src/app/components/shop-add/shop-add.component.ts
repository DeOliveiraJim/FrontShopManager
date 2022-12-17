import {
  Component,
  ComponentRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shared/shop';
import { AbstractComponent } from '../abstract/abstract.component';
import { ShopOpeningTimeComponent } from '../shop-opening-time/shop-opening-time.component';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css'],
})
export class ShopAddComponent extends AbstractComponent implements OnInit {
  shopName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  vacation = new FormControl(false);
  openingTimes: ComponentRef<ShopOpeningTimeComponent>[] = [];

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  ngOnInit(): void {}

  ngAfterViewInit() {
    // workaround moche pour éviter une erreur
    setTimeout(() => this.addOpeningTime(), 0);
  }

  constructor(
    public fb: FormBuilder,
    public shopService: ShopService,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
  }

  submitForm() {
    let shop = new Shop();
    shop.name = <string>this.shopName.value;
    shop.vacation = this.vacation.value === null ? false : this.vacation.value;
    shop.openingTimes = [];
    for (let x of this.openingTimes) {
      let ot = x.instance;
      let days = [];
      for (let i = 0; i < ot.checkboxGroup.value.controls!.length; i++) {
        if (ot.checkboxGroup.value.controls![i]) days.push(i);
      }
      shop.openingTimes.push({
        days: days,
        start: <string>ot.start.value,
        end: <string>ot.end.value,
      });
    }

    this.shopService.CreateShop(shop).subscribe({
      next: (res) => {
        this.showSuccesAlert('/shops/add');
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops/add');
      },
    });
  }

  addOpeningTime() {
    let c = this.container.createComponent(ShopOpeningTimeComponent);
    this.openingTimes.push(c);
  }
}
