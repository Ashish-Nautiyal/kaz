import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSpendOnAppComponent } from './time-spend-on-app.component';

describe('TimeSpendOnAppComponent', () => {
  let component: TimeSpendOnAppComponent;
  let fixture: ComponentFixture<TimeSpendOnAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSpendOnAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSpendOnAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
