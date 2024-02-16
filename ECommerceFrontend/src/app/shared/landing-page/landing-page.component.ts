import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  userEmail!: string;

  constructor(private authService: AuthenticationService,private router:Router,private toast:NgToastService) {}
  
  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userEmail = user.email;
    }
  }
  

  public isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout(); 
      this.toast.success({detail:"Success Message", summary: "You have been logged out successfully!", duration: 3000});
      this.router.navigate(['/landing']);
    }
  }
  showLoginMessage() {
    if (!this.authService.isAuthenticated()) {
      this.toast.warning({ detail: "Please login first to view your cart.", summary: "Login Required", duration: 3000 });
    } else {
      this.router.navigate(['/landing/cart']);
    }
  }

}
