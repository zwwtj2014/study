import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[log-on-click]'
})
export class LogOnClickDirective {
  constructor() {}

  @HostListener('click')
  onClick() {
    console.log('I am clicked');
  }
}
