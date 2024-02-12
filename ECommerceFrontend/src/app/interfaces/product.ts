export interface IProduct {
    id:number,
    productName:string,
    productPhotoUrl:string,
    price:number,
    productCategories:{
        categoryId:number,
        category:{
            categoryName:string
        }
    }
}
