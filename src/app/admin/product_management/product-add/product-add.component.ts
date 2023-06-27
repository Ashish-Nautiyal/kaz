import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: any;
  images: any[] = [];
  imagePath: any[] = [];
  documents: any[] = [];
  documentPath: any[] = [];
  productImage: any;
  productImagePath: any = "../../../assets/images/preview_image.png";;
  productVideo: any;
  productVideoPath: any;
  category: any;

  constructor(
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getProductForm();
    this.getCategories();
  }

  getProductForm() {
    this.productForm = this.fb.group({
      product_image: [''],
      product_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      investment: ['', Validators.required],
      payment_type: ['', Validators.required],
      number_of_payment: [''],
      payment_time: [''],
      frequency: [''],
      rate_of_return: ['50'],
      status: [false],
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

  onSubmit() {
    const formData = new FormData();
    formData.append('product_image', this.productImage);
    formData.append('product_name', this.productForm.controls['product_name'].value);
    formData.append('category', this.productForm.controls['category'].value);
    formData.append('description', this.productForm.controls['description'].value);
    formData.append('investment', this.productForm.controls['investment'].value);
    formData.append('payment_type', this.productForm.controls['payment_type'].value);
    formData.append('number_of_payment', this.productForm.controls['number_of_payment'].value);
    formData.append('payment_time', this.productForm.controls['payment_time'].value);
    formData.append('frequency', this.productForm.controls['frequency'].value);
    formData.append('rate_of_return', this.productForm.controls['rate_of_return'].value);
    formData.append('status', this.productForm.controls['status'].value);
    for (var i = 0; i < this.images.length; i++) {
      if (this.images[i] != null)
        formData.append("images", this.images[i]);
    }
    for (var i = 0; i < this.documents.length; i++) {
      if (this.documents[i] != null)
        formData.append("documents", this.documents[i]);
    }
    formData.append('video', this.productVideo);

    this.productService.addProduct(formData).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  setStatusValue(val: boolean) {
    this.productForm.controls['status'].setValue(val);
  }

  close() {
    this.dialogRef.close(false);
  }

  selectedProductImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.productImage = file;
      this.productImagePath = URL.createObjectURL(file);
    }
  }

  addImage() {
    this.images.push(null);
    this.imagePath.push(null);
  }

  onImageChange(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      this.images[index] = (file);
      this.imagePath[index] = (URL.createObjectURL(file));
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imagePath.splice(index, 1);
  }

  addDocument() {
    this.documents.push(null);
    this.documentPath.push(null);
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

  addVideo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.productVideo = file;
      this.productVideoPath = URL.createObjectURL(file);
    }
  }
}