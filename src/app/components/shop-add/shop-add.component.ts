import { Component, Directive, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import Swal from 'sweetalert2';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css'],
})
export class ShopAddComponent extends AbstractComponent implements OnInit {
  shopForm!: FormGroup;

  ngOnInit() {
    this.addShop();
  }

  constructor(
    public fb: FormBuilder,
    public shopService: ShopService,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
  }

  addShop() {
    this.shopForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      openingTime: [''],
      vacation: [''],
    });
  }
  submitForm() {
    this.shopService.CreateShop(this.shopForm.value).subscribe({
      next: (res) => {
        this.showSuccesAlert('/shops/add');
      },
      error: (err) => {
        this.showErrorAlert(err, '/shops/add');
      },
    });
  }
}
