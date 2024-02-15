import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductsComponent } from '../admin/products/products.component';
import { AdminModule } from '../admin/admin.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminModule,
    RouterModule
  ],
  exports:[LandingPageComponent]
})
export class SharedModule { }
