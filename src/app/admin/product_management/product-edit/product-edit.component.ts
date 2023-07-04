import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/app/enviroments/enviroment';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  editForm: any;
  category: any;
  productImage: any;
  productImagePath: any;
  images: any[] = [];
  imagePath: any[] = [];
  documents: any[] = [];
  documentPath: any[] = [];
  productVideo: any;
  productVideoPath: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductEditComponent>,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getEditForm();
    this.getCategories();
    this.setFormValue();
  }

  getEditForm() {
    this.editForm = this.fb.group({
      _id: [this.data._id],
      product_image: [''],
      product_name: [this.data.product_name, Validators.required],
      category: [this.data.category, Validators.required],
      description: [this.data.description, Validators.required],
      investment: [this.data.investment, Validators.required],
      payment_type: [this.data.payment_type, Validators.required],
      number_of_payment: [this.data.number_of_payment],
      payment_time: [this.data.payment_time],
      frequency: [this.data.frequency],
      rate_of_return: [this.data.rate_of_return],
      status: [this.data.status],
      images: [''],
      documents: [''],
      video: ['']
    });
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(
      res => {
        this.category = res.data;
      }, error => console.log(error)
    );
  }

  setFormValue() {
    this.productImage = this.data.product_image;
    this.productImagePath = environment.baseUrl + this.data.product_image;
    this.images = this.data.images;
    this.images.map((path) => {
      this.imagePath.push(environment.baseUrl + path);
    });
    this.documents = this.data.documents;
    this.documents.map((path) => {
      this.documentPath.push(environment.baseUrl + path);
    });
    this.productVideo = this.data.video;
    this.productVideoPath = environment.baseUrl + this.data.video;
  }

  selectedProductImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.productImage = file;
      this.productImagePath = URL.createObjectURL(file);
    }
  }

  setStatusValue(val: any) {
    this.editForm.controls['status'].setValue(val);
  }

  onImageChange(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      this.images[index] = file;
      this.imagePath[index] = URL.createObjectURL(file);
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imagePath.splice(index, 1);
  }

  addImage() {
    this.images.push(null);
    this.imagePath.push(null);
  }

  onDocumentChange(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      this.documents[index] = file;
      this.documentPath[index] = URL.createObjectURL(file);
    }
  }

  removeDocument(index: number) {
    this.documents.splice(index, 1);
    this.documentPath.splice(index, 1);
  }

  addDocument() {
    this.documents.push(null);
    this.documentPath.push(null);
  }

  addVideo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.productVideo = file;
      this.productVideoPath = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('_id', this.editForm.controls['_id'].value);
    formData.append('product_image', this.productImage);
    formData.append('product_name', this.editForm.controls['product_name'].value);
    formData.append('category', this.editForm.controls['category'].value);
    formData.append('description', this.editForm.controls['description'].value);
    formData.append('investment', this.editForm.controls['investment'].value);
    formData.append('payment_type', this.editForm.controls['payment_type'].value);
    formData.append('number_of_payment', this.editForm.controls['number_of_payment'].value);
    formData.append('payment_time', this.editForm.controls['payment_time'].value);
    formData.append('frequency', this.editForm.controls['frequency'].value);

    formData.append('rate_of_return', this.editForm.controls['rate_of_return'].value);
    formData.append('status', this.editForm.controls['status'].value);
    for (var i = 0; i < this.images.length; i++) {
      if (this.images[i] != null)
        formData.append("images", this.images[i]);
    }
    for (var i = 0; i < this.documents.length; i++) {
      if (this.documents[i] != null)
        formData.append("documents", this.documents[i]);
    }
    formData.append('video', this.productVideo);

    this.productService.updateProduct(formData).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close(false);
  }
}