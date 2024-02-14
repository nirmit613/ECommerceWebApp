import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ICategories } from 'src/app/interfaces/categories';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  imageUrl: any;
  public productCategoriesArray!: FormArray;
  public isEditMode!: boolean;
  public addProductForm!: FormGroup;
  public quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  public productCategories!:ICategories[];
  public selectedCategories: number[] = [];
  file:any;

  constructor(
    private productService: ProductService,private toast:NgToastService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: IProduct; mode: 'add' | 'update' }
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.isEditMode = this.data.mode === 'update';
    this.initializeForm();
  }

  initializeForm(): void {
    this.addProductForm = new FormGroup({
      id: new FormControl(this.data.product?.id ?? null),
      productName: new FormControl(this.data.product.productName, Validators.required),
      productPhotoUrl: new FormControl(this.data.product.productPhotoUrl, Validators.required),
      quantity: new FormControl(this.data.product?.quantity ?? null),
      price: new FormControl(this.data.product.price, Validators.required),
      productCategories: new FormArray([])
    });
    this.getCategories();
  }
  
  public isSelected(categoryId:any):boolean{
    return this.productCategories.includes(categoryId);
  }
  public getCategories(){
    return this.productService.getCategories().subscribe({next:(res)=>{
      this.productCategories = res.data;
    }})
  }
  public addProduct(){
    // debugger
    let data=this.addProductForm.value;
  //  this.dialogRef.afterClosed().subscribe({
  //     next: (res) => {
        console.log("Add Data result:", data);
  //       if (res != null) {
          // debugger

          let formdata=new FormData();
          formdata.append("modal",JSON.stringify(this.addProductForm.value));
          formdata.append("file",JSON.stringify(this.file));
          // formdata.append("file",this.addProductForm.value);

          this.productService.addProduct(formdata
            // id: res.id,
            // productName: res.productName,
            // productPhotoUrl: res.productPhotoUrl,
            // price: res.price,
            // quantity:res.quantity,
            // productCategories: res.productCategories 
          ).subscribe(res=>{
            this.dialogRef.close(this.addProductForm.value);
            this.file=null;
          });
    //     }
    //   }
    // });
   
  }
  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      // let formdata=new FormData();
      // formdata.append("file",file);
      this.file=file;
      this.addProductForm.patchValue({ productPhotoUrl: file });

    }
  }
  public onEditProduct() {
    console.log('Form Values on Update:', this.addProductForm.value);
    this.dialogRef.close(this.addProductForm.value);
  }
  public close(){
    this.dialogRef.close();
  }
  toggleCategorySelection(categoryId: number): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.addProductForm.setControl('productCategories', new FormArray(this.selectedCategories.map(id => new FormControl(id))));
  }
}
