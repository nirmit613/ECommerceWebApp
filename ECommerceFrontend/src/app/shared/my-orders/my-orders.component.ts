import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IOrder } from 'src/app/interfaces/order';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders: IOrder[] = [];
  userId!:number;
  constructor(private productService: ProductService,private toast:NgToastService,private router:Router) { }
  ngOnInit():void{
    this.getMyOrders();
  }

  getMyOrders(): void {
    const userDataString = localStorage.getItem('UserData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData.id; 
        this.userId = userId;
    this.productService.getMyOrders(userId).subscribe({
      next: (res) => {
        console.log(res)
        this.orders = res.data;
        },
      error: (error) => {
        this.toast.error({detail:"Error Message",summary:"Some error occur while fetching your orders!!",duration:3000})
      },
    });
  }
  }
  public cancelOrder(orderId: number): void {
    this.productService.cancelOrder(orderId).subscribe({
      next: (response: any) => {
        console.log('Order cancelled successfully');
        this.toast.success({detail:"Success Message",summary:"Your order cancelled successfully!!",duration:3000})
        this.getMyOrders();
      },
      error: (error: any) => {
        console.error('Error cancelling order:', error);
        // Handle error
      }
    });
  }

  public  navigateLanding(): void {
    this.router.navigate(['/landing']);
  }
}
