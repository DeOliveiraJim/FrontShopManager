import {
  Component,
  ComponentRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shared/shop';
import { AbstractComponent } from '../abstract/abstract.component';
import { ShopOpeningTimeComponent } from '../shop-opening-time-form/shop-opening-time-form.component';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css'],
})
export class ShopAddComponent extends AbstractComponent implements OnInit {
  shopForm!: FormGroup;
  openingTimes: ComponentRef<ShopOpeningTimeComponent>[] = [];
  submitted = false;

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      name: ['', Validators.pattern(/[\S]/)],
      vacation: [false],
    });
  }

  ngAfterViewInit() {
    // workaround moche pour éviter une erreur
    setTimeout(() => this.addOpeningTime(), 0);
  }

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
  }

  get ctrls() {
    return this.shopForm.controls;
  }

  submitForm() {
    this.submitted = true;
    let error = false;
    for (let ot of this.openingTimes) {
      ot.instance.submitted = true;
      if (ot.instance.openingTimeForm.invalid) error = true;
    }
    if (error) return;
    if (this.shopForm.invalid) return;
    let shop = new Shop();
    shop.name = <string>this.shopForm.controls['name'].value;
    shop.vacation =
      this.shopForm.controls['vacation'].value === null
        ? false
        : this.shopForm.controls['vacation'].value;
    shop.openingTimes = [];
    for (let x of this.openingTimes) {
      let ot = x.instance;
      let days = [];
      for (let i = 0; i < ot.daysForm.controls.length; i++) {
        if (ot.daysForm.controls[i].value) days.push(i);
      }
      shop.openingTimes.push({
        days: days,
        start: <string>ot.openingTimeForm.controls['start'].value,
        end: <string>ot.openingTimeForm.controls['end'].value,
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
    c.instance.closeItem.subscribe(() => {
      let i = this.openingTimes.findIndex((x) => x == c);
      if (i !== -1) {
        this.openingTimes.splice(i);
      }
      c.destroy();
    });
    this.openingTimes.push(c);
  }
}
