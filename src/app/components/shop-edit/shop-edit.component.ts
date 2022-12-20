import {
  Component,
  ComponentRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shared/shop';
import { AbstractComponent } from '../abstract/abstract.component';
import { ShopOpeningTimeComponent } from '../shop-opening-time/shop-opening-time.component';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css'],
})
export class ShopEditComponent extends AbstractComponent implements OnInit {
  private id: string;
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

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private actRoute: ActivatedRoute,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
    this.id = <string>this.actRoute.snapshot.paramMap.get('id');
    this.shopService.GetShop(this.id).subscribe((data) => {
      for (let ot of data.openingTimes) {
        let openingTimeComponentRef = this.container.createComponent(
          ShopOpeningTimeComponent
        );
        let otc = openingTimeComponentRef.instance;
        for (let day of ot.days) {
          otc.daysForm.controls[day].setValue(true);
        }
        if (ot.start.length === 4) ot.start = '0' + ot.start;
        if (ot.end.length === 4) ot.end = '0' + ot.end;
        otc.openingTimeForm.controls['start'].setValue(ot.start);
        otc.openingTimeForm.controls['end'].setValue(ot.end);
        this.openingTimes.push(openingTimeComponentRef);
      }
      this.shopForm.controls['name'].setValue(data.name);
      this.shopForm.controls['vacation'].setValue(data.vacation);
      this.shopForm = this.fb.group({
        name: [data.name, Validators.pattern(/[\S]/)],
        vacation: [data.vacation],
      });
    });
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
    shop.name = this.shopForm.controls['name'].value;
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

    this.shopService.UpdateShop(this.id, shop).subscribe({
      next: () => {
        this.showSuccesAlert('/shops/edit');
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops/edit');
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
