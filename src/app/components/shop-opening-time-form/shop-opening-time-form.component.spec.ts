import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOpeningTimeComponent } from './shop-opening-time-form.component';

describe('ShopOpeningTimeComponent', () => {
  let component: ShopOpeningTimeComponent;
  let fixture: ComponentFixture<ShopOpeningTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopOpeningTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopOpeningTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
