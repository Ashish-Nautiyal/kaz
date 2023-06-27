import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSignUpMonthlyComponent } from './account-sign-up-monthly.component';

describe('AccountSignUpMonthlyComponent', () => {
  let component: AccountSignUpMonthlyComponent;
  let fixture: ComponentFixture<AccountSignUpMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSignUpMonthlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSignUpMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
