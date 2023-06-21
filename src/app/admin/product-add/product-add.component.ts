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
  documents: any[] = [];
  productImage: any = "../../../assets/images/preview_image.png";
  category: any;

  constructor(private dialogRef: MatDialogRef<ProductAddComponent>, private productService: ProductService, private fb: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getProductForm();
    this.getCategories();
  }

  getProductForm() {
    this.productForm = this.fb.group({
      product_image: ['', Validators.required],
      product_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      investment: ['', Validators.required],
      payment_type: ['', Validators.required],
      number_of_payment: [''],
      payment_time: [''],
      frequency: [''],
      rate_of_return: [50],
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
    // this.productService.addProduct(this.productForm.value).subscribe(
    //   res => {
    //     this.dialogRef.close(true);
    //   }, error => console.log(error)
    // );
    console.log('form', this.productForm.value);
  }

  setValue(val: any) {

  }

  close() {
    this.dialogRef.close(false);
  }

  addImage() {
    this.images.push(null);
  }

  onImageChange(event: any, index: number) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.images.push(files[0]);
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  addDocument() {
    this.documents.push(null);
  }

  onDocumentChange(event: any, index: number) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images[index] = {
          file: files[0],
          url: e.target.result
        };
      };
      reader.readAsDataURL(files[0]);
    }
  }

  removeDocument(index: number) {
    this.documents.splice(index, 1);
  }

  selectedProductImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      let filePath = URL.createObjectURL(file);
      this.productImage = filePath;
    } else {
      this.productImage = "../../../assets/images/preview_image.png";
    }
  }
}