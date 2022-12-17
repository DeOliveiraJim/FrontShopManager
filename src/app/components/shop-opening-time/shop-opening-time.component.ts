import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop-opening-time',
  templateUrl: './shop-opening-time.component.html',
  styleUrls: ['./shop-opening-time.component.css'],
})
export class ShopOpeningTimeComponent implements OnInit {
  start = new FormControl('');
  end = new FormControl('');
  //public days = new FormArray();

  constructor(private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {}

  onClose() {
    this.viewContainer.element.nativeElement.parentElement.removeChild(
      this.viewContainer.element.nativeElement
    );
  }
}
