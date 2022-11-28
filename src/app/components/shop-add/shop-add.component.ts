import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css'],
})
export class ShopAddComponent implements OnInit {
  shopForm!: FormGroup;
  ngOnInit() {
    this.addShop();
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public shopService: ShopService
  ) {}
  addShop() {
    this.shopForm = this.fb.group({
      name: [''],
      openingTime: [''],
      vacation: [''],
    });
  }
  submitForm() {
    this.shopService.CreateShop(this.shopForm.value).subscribe((res) => {
      console.log('Shop ajoutée!');
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
}
