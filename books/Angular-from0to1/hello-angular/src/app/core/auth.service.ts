import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../domain/entities';
// tslint:disable-next-line:import-blacklist
import { ReplaySubject, Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  auth: Auth = { hasError: true, redirectUrl: '', errMsg: 'not logger in' };
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);

  constructor(private http: Http, @Inject('user') private userService) {}

  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }

  unAuth(): void {
    this.auth = Object.assign({}, this.auth, { user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in' });
    this.subject.next(this.auth);
  }

  loginWithCredentials(username: string, password: string): Observable<Auth> {
    return this.userService.findUser(username).map(user => {
      const auth = new Auth();
      if (null === user) {
        auth.hasError = true;
        auth.errMsg = 'user not found';
      } else if (password === user.password) {
        auth.user = user;
        auth.hasError = false;
        auth.errMsg = null;
      } else {
        auth.user = null;
        auth.hasError = true;
        auth.errMsg = 'password not match';
      }

      this.auth = Object.assign({}, auth);
      this.subject.next(this.auth);
      return this.auth;
    });
  }

  register(username: string, password: string): Observable<Auth> {
    const toAddUser = {
      username: username,
      password: password
    };

    return this.userService
      .findUser(username)
      .filter(user => user === null)
      .switchMap(auth => {
        return this.userService.addUser(toAddUser).map(u => {
          this.auth = Object.assign({}, { user: u, hasError: false, errMsg: null, redirectUrl: null });
          this.subject.next(this.auth);
          return this.auth;
        });
      });
  }

  private handleError(error: any): Promise<any> {
    console.log(`An error occurred: ${error}`);
    return Promise.reject(error.message || error);
  }
}
