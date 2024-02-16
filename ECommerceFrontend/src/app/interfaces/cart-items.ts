import { IProduct } from "./product";

export interface ICartItems {
    id:number,
    userId:number,
    productId:number,
    quantity:number
    product: IProduct;
}
