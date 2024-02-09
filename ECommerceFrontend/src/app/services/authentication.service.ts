import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/login';
import { environment as env } from 'src/environments/environment.development';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url: string = env.baseUrl;
  constructor(private http: HttpClient) {}
  public login(credentials: ILogin) {
    return this.http.post(this.url + 'login', credentials);
  }

  public signUp(userData: IUser) {
    let userApi = `${env.baseUrl}users/user`;
    return this.http.post(userApi, userData);
  }
}