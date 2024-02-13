import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public productList!:IProduct[];

  constructor(private productService:ProductService,private toast:NgToastService,private router:Router,public dialog: MatDialog,) {}
  ngOnInit(): void {
    this.getProducts();
  }
  public getProducts():void{
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log(res)
        this.productList = res.data;
      },
      error: (error) => {
        this.toast.error({detail:"Error Message",summary:"Some error occur while fetching the products!!",duration:3000})
      },
    });
  }
  public  navigateToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
  public convertImageToBase64(base64String: string): void {
    const image = new Image();
    image.onload = () => {
      console.log(image.src); 
    };
    image.src = base64String;
  }
  public addProduct(): void {
    let product:IProduct = {
      id:0,
      productName:'',
      productPhotoUrl:'',
      price:0,
      quantity:0,
      productCategories:[],

    };
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: { product: product, mode: 'add' },
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe({
      
      next: (res) => {
        console.log("AddData result:", res);
        if (res != null) {
          this.productService.addProduct({
            id: res.id,
            productName: res.productName,
            productPhotoUrl: res.productPhotoUrl,
            price: res.price,
            quantity:res.quantity,
            productCategories: res.productCategories 
          }).subscribe(() => {
            this.getProducts();
          });
        }
      }
    });
  }
}
 