import { Component, Inject, Input } from '@angular/core';
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
  public productCategoriesArray!: FormArray;
  public isEditMode!: boolean;
  public addProductForm!: FormGroup;
  public quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  public productCategories!:ICategories[];

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
      productName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      productPhotoUrl: new FormControl('', Validators.required),
      quantity: new FormControl(1, [Validators.required, Validators.min(0)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      productCategories: new FormArray([])
    });
    this.getCategories();
  }
  public getCategories(){
    return this.productService.getCategories().subscribe({next:(res)=>{
      this.productCategories = res.data;
    }})
  }
  public addProduct(){
    this.dialogRef.close(this.addProductForm.value);
  }
  public onEdiEmployee() {
    console.log('Form Values on Update:', this.addProductForm.value);
    this.dialogRef.close(this.addProductForm.value);
  }
  public close(){
    this.dialogRef.close();
  }
  toggleCategorySelection(categoryId: number): void {
    if (this.productCategoriesArray) {
      const index = this.productCategoriesArray.value.indexOf(categoryId);
      if (index === -1) {
        this.productCategoriesArray.push(new FormControl(categoryId));
      } else {
        this.productCategoriesArray.removeAt(index);
      }
    }
    
  }
}
