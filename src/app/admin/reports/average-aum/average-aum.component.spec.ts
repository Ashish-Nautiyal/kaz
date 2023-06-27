import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageAUMComponent } from './average-aum.component';

describe('AverageAUMComponent', () => {
  let component: AverageAUMComponent;
  let fixture: ComponentFixture<AverageAUMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageAUMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageAUMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
