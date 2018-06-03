import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private router: Router, @Inject('auth') private authService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url = state.url;
    return this.authService.getAuth().map(auth => !auth.hasError);
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.authService.getAuth().map(auth => !auth.hasError);
  }

  checkLogin(url: string): boolean {
    if (localStorage.getItem('userId') !== null) {
      return true;
    }

    localStorage.setItem('redirectUrl', url);
    this.router.navigate(['/login']);
    return false;
  }
}
