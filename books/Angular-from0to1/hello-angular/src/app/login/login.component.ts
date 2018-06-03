import { Component, OnInit, Inject, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, Image } from '../domain/entities';
import { ECharts } from 'echarts';
import { Subscriber } from 'rxjs/Subscriber';
import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginState', [
      state(
        'inactive',
        style({
          transform: 'scale(1)'
        })
      ),
      state(
        'active',
        style({
          transform: 'scale(1.1)'
        })
      ),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  slides: Image[] = [];
  photo = '/assets/426359.png';
  auth: Auth;

  subscription: Subscriber<any>;

  loginBtnState;

  // tslint:disable-next-line:max-line-length
  constructor(@Inject('auth') private authService, @Inject('bing') private bingService, private dialogService: MdlDialogService, private router: Router) {
    this.bingService.getImageUrl().subscribe(images => {
      this.slides = [...images];
      this.rotateImages(this.slides);
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.subscription = this.authService.loginWithCredentials(this.username, this.password).subscribe((auth: Auth) => {
      // const redirectUrl = auth.redirectUrl === null ? '/' : auth.redirectUrl;
      this.auth = Object.assign({}, auth);
      if (!auth.hasError) {
        this.router.navigate(['todo']);
      }
    });
    console.log(`auth result is: ${this.authService.loginWithCredentials(this.username, this.password)}`);
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

  // tslint:disable-next-line:no-shadowed-variable
  toggleLoginState(state: boolean) {
    this.loginBtnState = state ? 'active' : 'inactive';
  }

  register($event: MouseEvent) {
    const pDialog = this.dialogService.showCustomDialog({
      component: RegisterDialogComponent,
      isModal: true,
      styles: { width: '350px' },
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.map((dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
