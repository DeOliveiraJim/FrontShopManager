import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillDatabaseButtonComponent } from './fill-database-button.component';

describe('FillDatabaseButtonComponent', () => {
  let component: FillDatabaseButtonComponent;
  let fixture: ComponentFixture<FillDatabaseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillDatabaseButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillDatabaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
