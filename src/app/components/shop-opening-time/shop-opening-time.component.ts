import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import DAYS_LIST from './days';

@Component({
  selector: 'app-shop-opening-time',
  templateUrl: './shop-opening-time.component.html',
  styleUrls: ['./shop-opening-time.component.css'],
})
export class ShopOpeningTimeComponent implements OnInit {
  @Output() closeItem = new EventEmitter();
  DAYS_LIST = DAYS_LIST;

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
    this.closeItem.emit();
  }
}
