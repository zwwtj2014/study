import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../domain/entities';

@Injectable()
export class AuthService {
  constructor(private http: Http, @Inject('user') private userService) {}

  loginWithCredentials(username: string, password: string): Promise<Auth> {
    return this.userService.findUser(username).then(user => {
      const auth = new Auth();
      localStorage.removeItem('userId');
      const redirectUrl = localStorage.getItem('redirectUrl') === null ? '/' : localStorage.getItem('redirectUrl');
      auth.redirectUrl = redirectUrl;
      if (null === user) {
        auth.hasError = true;
        auth.errMsg = 'user not found';
      } else if (password === user.password) {
        auth.user = Object.assign({}, user);
        auth.hasError = false;
        localStorage.setItem('userId', user.id);
      } else {
        auth.hasError = true;
        auth.errMsg = 'password not match';
      }

      return auth;
    });
  }

  private handleError(error: any): Promise<any> {
    console.log(`An error occurred: ${error}`);
    return Promise.reject(error.message || error);
  }
}
