import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '请输入用户名';
  password = '请输入密码';

  constructor(@Inject('auth') private service) {}

  ngOnInit() {}

  onSubmit(formValue) {
    console.log(`auth result is: ${this.service.loginWithCredentials(this.username, this.password)}`);
  }

  onfocus() {
    console.log(123);
    this.username = '';
  }
}
