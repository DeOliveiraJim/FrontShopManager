import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop-opening-time',
  templateUrl: './shop-opening-time.component.html',
  styleUrls: ['./shop-opening-time.component.css'],
})
export class ShopOpeningTimeComponent implements OnInit {
  DAYS_LIST = [
    { name: 'Lundi', value: 0 },
    { name: 'Mardi', value: 1 },
    { name: 'Mercedi', value: 2 },
    { name: 'Jeudi', value: 3 },
    { name: 'Vendredi', value: 4 },
    { name: 'Samedi', value: 5 },
    { name: 'Dimanche', value: 6 },
  ];

  checkboxGroup = this.fb.group({
    controls: this.fb.array([false, false, false, false, false, false, false]),
  });

  start = new FormControl('');
  end = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.viewContainer.element.nativeElement.parentElement.removeChild(
      this.viewContainer.element.nativeElement
    );
  }
}
