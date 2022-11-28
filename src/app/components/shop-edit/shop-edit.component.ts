import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css'],
})
export class ShopEditComponent implements OnInit {
  updateShopForm!: FormGroup<{
    name: FormControl<string | null>;
    openingTime: FormControl<string | null>;
    vacation: FormControl<boolean | null>;
  }>;

  ngOnInit() {
    this.updateForm();
  }
  constructor(
    private actRoute: ActivatedRoute,
    public shopService: ShopService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id')!;

    this.shopService.GetShop(id).subscribe((data) => {
      this.updateShopForm = this.fb.group({
        name: [data.name],
        openingTime: [data.openingTime],
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
    this.shopService
      .UpdateShop(id, this.updateShopForm.value)
      .subscribe((res) => {
        console.log(id);
        console.log('Shop éditée!');
        console.log(this.updateShopForm.value);
        this.ngZone.run(() => this.router.navigateByUrl('/shops'));
      });
  }
}
