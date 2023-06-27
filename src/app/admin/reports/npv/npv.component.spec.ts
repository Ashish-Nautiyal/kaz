import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPVComponent } from './npv.component';

describe('NPVComponent', () => {
  let component: NPVComponent;
  let fixture: ComponentFixture<NPVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NPVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NPVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
