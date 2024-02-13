import { IProductCategory } from "./product-category";

export interface IProduct {
    id:number,
    productName:string,
    productPhotoUrl:string,
    quantity:number,
    price:number,
    productCategories:IProductCategory[]
}
