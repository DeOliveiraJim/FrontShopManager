import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css'],
})
export class ShopEditComponent extends AbstractComponent implements OnInit {
  updateShopForm!: FormGroup;

  ngOnInit() {
    this.updateForm();
  }
  constructor(
    private actRoute: ActivatedRoute,
    public shopService: ShopService,
    public fb: FormBuilder,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
    var id = this.actRoute.snapshot.paramMap.get('id')!;

    this.shopService.GetShop(id).subscribe((data) => {
      this.updateShopForm = this.fb.group({
        name: [data.name],
        openingTimes: [data.openingTimes],
        vacation: [data.vacation],
      });
    });
  }
  updateForm() {
    this.updateShopForm = this.fb.group({
      name: [''],
      openingTime: [''],
      vacation: [false],
    });
  }
  submitForm() {
    let id = this.actRoute.snapshot.paramMap.get('id')!;
    this.shopService.UpdateShop(id, this.updateShopForm.value).subscribe({
      next: (res) => {
        this.showSuccesAlert('/shops');
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops');
      },
    });
  }
}
