import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss']
})
export class AuthWrapperComponent {
  public header = [
    {
      title: 'Login',
      link: '/auth/login',
    },
    {
      title: 'SignUp',
      link: 'signup',
    },
  ];
}
