import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
@Component({
  selector: 'app-shop-opening-time-form',
  templateUrl: './shop-opening-time-form.component.html',
  styleUrls: ['./shop-opening-time-form.component.css'],
})
export class ShopOpeningTimeComponent implements OnInit {
  submitted = false;
  @Output() closeItem = new EventEmitter();

  daysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  openingTimeForm!: FormGroup;
  daysForm = this.fb.array([false, false, false, false, false, false, false], daysValidator());

  constructor(private fb: FormBuilder) {
    this.openingTimeForm = this.fb.group({
      start: [''],
      end: [''],
      days: this.daysForm,
    });
  }

  ngOnInit(): void {}

  onClose() {
    this.closeItem.emit();
  }

  get ctrls() {
    return this.openingTimeForm.controls;
  }
}

function daysValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormArray<FormControl<boolean | null>>)) return { error: 'wrong control' };

    let isOneTrue = false;
    for (let x of control.controls) {
      if (x.value) isOneTrue = true;
    }
    return isOneTrue ? null : { error: 'no one true' };
  };
}
