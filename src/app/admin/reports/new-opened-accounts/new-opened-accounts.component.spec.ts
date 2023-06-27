import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOpenedAccountsComponent } from './new-opened-accounts.component';

describe('NewOpenedAccountsComponent', () => {
  let component: NewOpenedAccountsComponent;
  let fixture: ComponentFixture<NewOpenedAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOpenedAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOpenedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
