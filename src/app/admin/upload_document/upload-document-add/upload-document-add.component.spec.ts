import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentAddComponent } from './upload-document-add.component';

describe('UploadDocumentAddComponent', () => {
  let component: UploadDocumentAddComponent;
  let fixture: ComponentFixture<UploadDocumentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDocumentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
