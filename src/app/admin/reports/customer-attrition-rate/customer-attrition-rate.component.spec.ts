import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAttritionRateComponent } from './customer-attrition-rate.component';

describe('CustomerAttritionRateComponent', () => {
  let component: CustomerAttritionRateComponent;
  let fixture: ComponentFixture<CustomerAttritionRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAttritionRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAttritionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
