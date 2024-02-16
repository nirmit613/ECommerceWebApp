import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ICartItems } from 'src/app/interfaces/cart-items';

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
  public addToCart(productId:number){
    // debugger
    if (!this.authService.isAuthenticated()) {
      this.toast.warning({detail:"Warning Message",summary:"Please do login first to add product into cart!!",duration:4000})
      this.router.navigate(['/auth/login']);
    } else {
      const userDataString = localStorage.getItem('UserData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.id; 
      
      const cartItem: ICartItems = {
        id: 0,
        userId: userId,
        productId: productId,
        quantity: 1,
        product:{
          id:productId,
          productName:'',
          productPhotoUrl: null,
          price:0,
          quantity:0,
          productCategories:[],

        }
      };

      this.productService.addToCart(cartItem).subscribe(
        () => {
          this.toast.success({ detail: "Success Messege", summary: "Product added to the cart successfully!!!", duration: 3000 });
          console.log('Product added to cart');
        },
        error => {
          console.error('Error adding product to cart:', error);
          this.toast.error({ detail: "Error Message", summary:"Failed to add the product to the cart." , duration: 3000 });
        }
      );
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
 