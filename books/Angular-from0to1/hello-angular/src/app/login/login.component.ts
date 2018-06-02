import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  auth: Auth;

  constructor(@Inject('auth') private service, private router: Router) {}

  ngOnInit() {}

  onSubmit(formValue) {
    this.service.loginWithCredentials(formValue.login.username, formValue.login.password).then((auth: Auth) => {
      const redirectUrl = auth.redirectUrl === null ? '/' : auth.redirectUrl;
      if (!auth.hasError) {
        this.router.navigate([redirectUrl]);
        localStorage.removeItem('redirectUrl');
      } else {
        this.auth = Object.assign({}, auth);
      }
    });
    console.log(`auth result is: ${this.service.loginWithCredentials(this.username, this.password)}`);
  }

  onfocus() {
    console.log(123);
    this.username = '';
  }
}
