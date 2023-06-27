import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormEditDialogComponent } from './category-form-edit-dialog.component';

describe('CategoryFormEditDialogComponent', () => {
  let component: CategoryFormEditDialogComponent;
  let fixture: ComponentFixture<CategoryFormEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFormEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFormEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
