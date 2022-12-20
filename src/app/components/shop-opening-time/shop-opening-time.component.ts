import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-shop-opening-time',
  templateUrl: './shop-opening-time.component.html',
  styleUrls: ['./shop-opening-time.component.css'],
})
export class ShopOpeningTimeComponent implements OnInit {
  @Output() closeItem = new EventEmitter();
  daysList = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];

  openingTimeForm!: FormGroup;
  daysForm = this.fb.array(
    [false, false, false, false, false, false, false],
    Validators.required
  );

  constructor(private fb: FormBuilder) {
    this.openingTimeForm = this.fb.group({
      start: ['', Validators.pattern('([0-1]?\\d|2[0-3]):[0-5]\\d')],
      end: ['', Validators.pattern('([0-1]?\\d|2[0-3]):[0-5]\\d')],
      days: this.daysForm,
    });
  }

  ngOnInit(): void {}

  onClose() {
    this.closeItem.emit();
  }
}
