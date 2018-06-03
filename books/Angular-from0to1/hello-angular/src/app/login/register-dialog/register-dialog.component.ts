import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';
import { MdlTextFieldComponent, MdlDialogReference } from '@angular-mdl/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;
  public form: FormGroup;
  public processingRegister = false;
  public statusMessage = '';
  private subscription: Subscription;
  ngOnInit() {}
  constructor(private dialog: MdlDialogReference, private fb: FormBuilder, private router: Router, @Inject('auth') private authService) {
    this.form = fb.group({
      username: new FormControl('', Validators.required),
      passwords: fb.group(
        {
          password: new FormControl('', Validators.required),
          repeatPassword: new FormControl('', Validators.required)
        },
        { validator: this.passwordMatchValidator }
      )
    });
    this.dialog.onHide().subscribe(auth => {
      console.log('login dialog hidden');

      if (auth) {
        console.log('authenticated user', auth);
      }
    });

    this.dialog.onVisible().subscribe(() => {
      this.inputElement.setFocus();
    });
  }

  passwordMatchValidator(group: FormGroup) {
    this.statusMessage = '';
    const password = group.get('password').value;
    const confirm = group.get('repeatPassword').value;

    if (password.pristine || confirm.pristine) {
      return null;
    }

    if (password === confirm) {
      return null;
    }

    return { mismatch: true };
  }

  public register() {
    this.processingRegister = true;
    this.statusMessage = 'processing your registration ...';

    // tslint:disable-next-line:max-line-length
    this.subscription = this.authService.register(this.form.get('username').value, this.form.get('passwords').get('password').value).subscribe(
      auth => {
        this.processingRegister = false;
        this.statusMessage = 'you are registered and will be signed in ...';
        setTimeout(() => {
          this.dialog.hide(auth);
          this.router.navigate(['todo']);
        }, 500);
      },
      err => {
        this.processingRegister = false;
        this.statusMessage = err.message;
      }
    );
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
    this.dialog.hide();
  }
}
