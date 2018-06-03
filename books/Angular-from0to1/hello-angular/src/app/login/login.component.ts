import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../domain/entities';
import { ECharts } from 'echarts';

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

  onSubmit() {
    this.service.loginWithCredentials(this.username, this.password).subscribe((auth: Auth) => {
      // const redirectUrl = auth.redirectUrl === null ? '/' : auth.redirectUrl;
      this.auth = Object.assign({}, auth);
      if (!auth.hasError) {
        this.router.navigate(['todo']);
      }
    });
    console.log(`auth result is: ${this.service.loginWithCredentials(this.username, this.password)}`);
  }

  onfocus() {
    console.log(123);
    this.username = '';
  }
}
