import { IProduct } from "./product"
import { IUser } from "./user"

export interface IOrder {
    id:number,
    userId:number,
    productId:number | null,
    quantity:number,
    totalAmount:number,
    status:string,
    orderDate:string,
    product:IProduct,
    user:IUser
}
