import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BingImageService } from './bing-image.service';
import { LoginComponent } from './login.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [SharedModule, LoginRoutingModule, ReactiveFormsModule],
  declarations: [LoginComponent, RegisterDialogComponent],
  entryComponents: [RegisterDialogComponent],
  providers: [{ provide: 'bing', useClass: BingImageService }]
})
export class LoginModule {}
