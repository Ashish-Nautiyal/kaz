import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionRatioComponent } from './conversion-ratio.component';

describe('ConversionRatioComponent', () => {
  let component: ConversionRatioComponent;
  let fixture: ComponentFixture<ConversionRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversionRatioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
