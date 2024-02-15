import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private authService: AuthenticationService, private router: Router) { }
  userEmail!: string;
  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData) {
      // Parse user data to extract user's email
      const user = JSON.parse(userData);
      this.userEmail = user.email;
    }
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/landing']);
  }
}
