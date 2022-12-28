import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
const langageCodes = require('./langage-codes.json').codes as string[];

@Component({
  selector: 'app-product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styleUrls: ['./product-detail-form.component.css'],
})
export class ProductDetailFormComponent implements OnInit {
  submitted = false;
  @Output() closeItem = new EventEmitter();
  langageNames = new Intl.DisplayNames(['fr'], { type: 'language' });
  langageCodes = langageCodes.sort((a, b) => {
    let x = this.langageNames.of(a);
    let y = this.langageNames.of(b);
    if (x == undefined || y == undefined) return 0;
    return x.localeCompare(y);
  });
  productDetailForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productDetailForm = this.fb.group({
      lang: [''],
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onClose() {
    this.closeItem.emit();
  }

  getLanguageName(code: string) {
    let l = this.langageNames.of(code);
    if (l == undefined) return 'null';
    return l.charAt(0).toUpperCase() + l.slice(1);
  }

  get ctrls() {
    return this.productDetailForm.controls;
  }
}
