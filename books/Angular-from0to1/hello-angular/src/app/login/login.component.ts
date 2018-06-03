import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, Image } from '../domain/entities';
import { ECharts } from 'echarts';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  slides: Image[] = [];
  photo = '/assets/426359.png';
  auth: Auth;

  subscription: Subscriber<any>;

  constructor(@Inject('auth') private service, @Inject('bing') private bingService, private router: Router) {
    this.bingService.getImageUrl().subscribe(images => {
      this.slides = [...images];
      this.rotateImages(this.slides);
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.subscription = this.service.loginWithCredentials(this.username, this.password).subscribe((auth: Auth) => {
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

  rotateImages(arr: Image[]) {
    const length = arr.length;
    let i = 0;
    setInterval(() => {
      i = (i + 1) % length;
      this.photo = this.slides[i].contentUrl;
    }, 4000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
