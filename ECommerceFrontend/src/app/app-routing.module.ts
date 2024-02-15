import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'landing',
    pathMatch:'full'
  },
  { path: 'landing', component: LandingPageComponent },
  { path: 'landing/men', component: LandingPageComponent },
  { path: 'landing/women', component: LandingPageComponent },
  { path: 'landing/kids', component: LandingPageComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  }
  ,
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}