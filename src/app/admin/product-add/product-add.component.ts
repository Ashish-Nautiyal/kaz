import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: any;
  images: string[] = [];
  url: object[] = [];


  constructor(private dialogRef: MatDialogRef<ProductAddComponent>, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductForm();
  }

  getProductForm() {

  }

  onSubmit() {
    this.productService.addProduct(this.productForm.value).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close(false);
  }

  setValue(val: any) {

  }

  addImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length) {
        const file = target.files[0];
        this.url.push(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageUrl = reader.result as string;
          this.images.push(imageUrl);
        };
      }
    };
    input.click();

  }

  urls(){
    console.log('url',this.url);    
  }
}