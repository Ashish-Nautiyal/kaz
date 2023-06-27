import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionRateComponent } from './retention-rate.component';

describe('RetentionRateComponent', () => {
  let component: RetentionRateComponent;
  let fixture: ComponentFixture<RetentionRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetentionRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetentionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
