import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public productList!:IProduct[];
  public showAddButton:Boolean = false;


  constructor(private productService:ProductService,private toast:NgToastService,private router:Router,public dialog: MatDialog,private authService:AuthenticationService) {}
  ngOnInit(): void {
    this.checkUserRole();
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
  
  checkUserRole() {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole();
      if (userRole === 'admin') {
        this.showAddButton = true;
      }
    }
  }
  
  public  navigateToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
public addProduct(): void {
    let product:IProduct = {
      id:0,
      productName:'',
      productPhotoUrl: null,
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
        console.log("Add Data result:", res);
        this.getProducts();
      }
    });
  }
}
 